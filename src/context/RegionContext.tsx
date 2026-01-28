
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export type Currency = 'USD' | 'INR' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'RUB' | 'CNY';

interface RegionContextType {
    countryCode: string;
    currency: Currency;
    currencySymbol: string;
    convertPrice: (usdPrice: number) => string;
    isLoading: boolean;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

const EXCHANGE_RATES: Record<Currency, number> = {
    USD: 1,
    INR: 84.50,
    EUR: 0.92,
    GBP: 0.78,
    CAD: 1.35,
    AUD: 1.52,
    RUB: 92.50,
    CNY: 7.23
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
    USD: '$',
    INR: '₹',
    EUR: '€',
    GBP: '£',
    CAD: 'C$',
    AUD: 'A$',
    RUB: '₽',
    CNY: '¥'
};

export const RegionProvider = ({ children }: { children: React.ReactNode }) => {
    const { i18n } = useTranslation();
    const [countryCode, setCountryCode] = useState<string>('US');
    const [currency, setCurrency] = useState<Currency>('USD');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const detectRegion = async () => {
            let detectedCountry = 'US'; // Default
            try {
                // Try Primary API
                const response = await axios.get('https://ipapi.co/json/', { timeout: 5000 });
                detectedCountry = response.data.country_code;
            } catch {
                try {
                    // Try Fallback API (ipwho.is)
                    const response = await axios.get('https://ipwho.is/', { timeout: 5000 });
                    if (response.data.success) {
                        detectedCountry = response.data.country_code;
                    }
                } catch (fallbackError) {
                    console.error("All IP APIs failed", fallbackError);
                    // Remains 'US'
                }
            }

            setCountryCode(detectedCountry);

            let newCurrency: Currency = 'USD';
            let newLang = 'en';

            if (detectedCountry === 'IN') {
                newCurrency = 'INR';
                newLang = 'en';
            }
            // 2. Eurozone (Common countries)
            else if (['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT', 'FI', 'GR', 'IE'].includes(detectedCountry)) {
                newCurrency = 'EUR';
                if (detectedCountry === 'DE' || detectedCountry === 'AT') newLang = 'de';
                else if (detectedCountry === 'ES') newLang = 'es';
                else if (detectedCountry === 'FR') newLang = 'fr';
                else newLang = 'en';
            }
            // 3. UK
            else if (detectedCountry === 'GB' || detectedCountry === 'UK') {
                newCurrency = 'GBP';
                newLang = 'en';
            }
            // 4. Canada
            else if (detectedCountry === 'CA') {
                newCurrency = 'CAD';
                newLang = 'en';
            }
            // 5. Australia
            else if (detectedCountry === 'AU') {
                newCurrency = 'AUD';
                newLang = 'en';
            }
            // 6. Russia
            else if (detectedCountry === 'RU') {
                newCurrency = 'RUB';
                newLang = 'ru';
            }
            // 7. China
            else if (detectedCountry === 'CN') {
                newCurrency = 'CNY';
                newLang = 'zh';
            }
            // 8. Latin America
            else if (['MX', 'AR', 'CO', 'PE', 'CL'].includes(detectedCountry)) {
                newCurrency = 'USD';
                newLang = 'es';
            }

            setCurrency(newCurrency);
            i18n.changeLanguage(newLang);
            setIsLoading(false);
        };

        detectRegion();
    }, [i18n]);

    const convertPrice = (usdPrice: number): string => {
        const rate = EXCHANGE_RATES[currency] || 1;
        let converted = Math.round(usdPrice * rate);
        if (['INR', 'RUB', 'CNY'].includes(currency)) {
            converted = Math.round(usdPrice * rate / 10) * 10;
        }
        return `${CURRENCY_SYMBOLS[currency]}${converted.toLocaleString()}`;
    };

    return (
        <RegionContext.Provider value={{ countryCode, currency, currencySymbol: CURRENCY_SYMBOLS[currency], convertPrice, isLoading }}>
            {children}
        </RegionContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRegion = () => {
    const context = useContext(RegionContext);
    if (context === undefined) {
        throw new Error('useRegion must be used within a RegionProvider');
    }
    return context;
};

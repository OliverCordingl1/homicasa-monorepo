"use client";

import { Input } from "@/components/ui/input";
import allCountryCodes from "@homicasa/config/countries.json";
import { useEffect, useMemo, useState, useRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountrySelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

function getCountryName(code: string, locale: string = "en") {
  try {
    const regionNames = new Intl.DisplayNames([locale], { type: "region" });
    return regionNames.of(code) || code;
  } catch {
    return code;
  }
}

// Map common timezones to country codes
const timezoneToCountry: Record<string, string> = {
  // Europe
  "Europe/London": "GB",
  "Europe/Dublin": "IE",
  "Europe/Paris": "FR",
  "Europe/Berlin": "DE",
  "Europe/Madrid": "ES",
  "Europe/Rome": "IT",
  "Europe/Amsterdam": "NL",
  "Europe/Brussels": "BE",
  "Europe/Stockholm": "SE",
  "Europe/Oslo": "NO",
  "Europe/Copenhagen": "DK",
  "Europe/Helsinki": "FI",
  "Europe/Warsaw": "PL",
  "Europe/Prague": "CZ",
  "Europe/Vienna": "AT",
  "Europe/Zurich": "CH",
  "Europe/Lisbon": "PT",
  "Europe/Athens": "GR",
  // Americas
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Phoenix": "US",
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "America/Mexico_City": "MX",
  "America/Sao_Paulo": "BR",
  "America/Buenos_Aires": "AR",
  "America/Santiago": "CL",
  "America/Bogota": "CO",
  "America/Lima": "PE",
  // Asia
  "Asia/Tokyo": "JP",
  "Asia/Shanghai": "CN",
  "Asia/Hong_Kong": "HK",
  "Asia/Singapore": "SG",
  "Asia/Seoul": "KR",
  "Asia/Bangkok": "TH",
  "Asia/Manila": "PH",
  "Asia/Jakarta": "ID",
  "Asia/Kolkata": "IN",
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Asia/Tel_Aviv": "IL",
  "Asia/Istanbul": "TR",
  // Oceania
  "Pacific/Auckland": "NZ",
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
  "Australia/Brisbane": "AU",
  "Australia/Perth": "AU",
  // Africa
  "Africa/Johannesburg": "ZA",
  "Africa/Cairo": "EG",
  "Africa/Lagos": "NG",
  "Africa/Nairobi": "KE",
};

function detectCountryFromTimezone(): string | null {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timezoneToCountry[timezone] || null;
  } catch {
    return null;
  }
}

export function CountrySelect({
  value,
  onValueChange,
  placeholder = "Search or select a country",
  disabled = false,
}: CountrySelectProps) {
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDetectedCountry(detectCountryFromTimezone());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const countries = useMemo(
    () =>
      allCountryCodes
        .map((code) => ({
          code,
          name: getCountryName(code),
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const selectedCountry = useMemo(
    () => countries.find((c) => c.code === value),
    [countries, value]
  );

  const displayValue = selectedCountry?.name || "";

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries;
    const lowerSearch = searchTerm.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerSearch) ||
        c.code.toLowerCase().includes(lowerSearch)
    );
  }, [countries, searchTerm]);

  const suggestedCountries = useMemo(() => {
    if (!detectedCountry) return [];
    return filteredCountries.filter((c) => c.code === detectedCountry);
  }, [detectedCountry, filteredCountries]);

  const otherCountries = useMemo(() => {
    if (!detectedCountry) return filteredCountries;
    return filteredCountries.filter((c) => c.code !== detectedCountry);
  }, [detectedCountry, filteredCountries]);

  const handleSelect = (code: string) => {
    onValueChange(code);
    setSearchTerm("");
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        type="text"
        value={isOpen ? searchTerm : displayValue}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (!isOpen) setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        className="w-full"
      />

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 max-h-[300px] overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md"
        >
          {suggestedCountries.length > 0 && (
            <div className="p-1">
              <div className="px-2 py-1.5 text-xs text-muted-foreground font-semibold">
                Suggested
              </div>
              {suggestedCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country.code)}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-left outline-none hover:bg-accent hover:text-accent-foreground",
                    value === country.code && "bg-accent"
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0",
                      value === country.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="flex-1">{country.name}</span>
                </button>
              ))}
            </div>
          )}

          <div className="p-1">
            {suggestedCountries.length > 0 && (
              <div className="px-2 py-1.5 text-xs text-muted-foreground font-semibold">
                All Countries
              </div>
            )}
            {otherCountries.length > 0 ? (
              otherCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country.code)}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-left outline-none hover:bg-accent hover:text-accent-foreground",
                    value === country.code && "bg-accent"
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0",
                      value === country.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="flex-1">{country.name}</span>
                </button>
              ))
            ) : (
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

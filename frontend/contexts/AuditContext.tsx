"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuditContextType {
  dataValues: Record<string, string>;
  validationScores: Record<string, number>;
  updateDataValue: (key: string, value: string) => void;
  updateValidationScore: (key: string, score: number) => void;
  resetAudit: () => void;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export function AuditProvider({ children }: { children: React.ReactNode }) {
  const [dataValues, setDataValues] = useState<Record<string, string>>({});
  const [validationScores, setValidationScores] = useState<Record<string, number>>({});

  // Optional: We can load from localStorage here if needed in the future

  const updateDataValue = (key: string, value: string) => {
    setDataValues(prev => ({ ...prev, [key]: value }));
  };

  const updateValidationScore = (key: string, score: number) => {
    setValidationScores(prev => ({ ...prev, [key]: score }));
  };

  const resetAudit = () => {
    setDataValues({});
    setValidationScores({});
  };

  return (
    <AuditContext.Provider
      value={{
        dataValues,
        validationScores,
        updateDataValue,
        updateValidationScore,
        resetAudit,
      }}
    >
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit() {
  const context = useContext(AuditContext);
  if (context === undefined) {
    throw new Error("useAudit must be used within an AuditProvider");
  }
  return context;
}

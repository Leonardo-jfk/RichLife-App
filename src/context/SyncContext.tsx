import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../library/supabase';
import { useAuth } from './AuthContext';

interface SyncContextType {
  transactions: any[];
  dreams: any[];
  goals: any[];
  credits: any[];
  isLoading: boolean;
  syncData: () => Promise<void>;
  addTransaction: (data: any) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  // Ajoutez les autres CRUD operations
}

const SyncContext = createContext<SyncContextType>({} as SyncContextType);

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [dreams, setDreams] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [credits, setCredits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTransactions = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });
    setTransactions(data || []);
  };

  const loadDreams = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('dreams')
      .select('*')
      .eq('user_id', user.id);
    setDreams(data || []);
  };

  const loadGoals = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', user.id);
    setGoals(data || []);
  };

  const loadCredits = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('credits')
      .select('*')
      .eq('user_id', user.id);
    setCredits(data || []);
  };

  const syncData = async () => {
    setIsLoading(true);
    await Promise.all([
      loadTransactions(),
      loadDreams(),
      loadGoals(),
      loadCredits(),
    ]);
    setIsLoading(false);
  };

  const addTransaction = async (data: any) => {
    if (!user) return;
    const { error } = await supabase.from('transactions').insert({
      ...data,
      user_id: user.id,
    });
    if (!error) await loadTransactions();
  };

  const deleteTransaction = async (id: string) => {
    if (!user) return;
    await supabase.from('transactions').delete().eq('id', id);
    await loadTransactions();
  };

  useEffect(() => {
    if (user) {
      syncData();
    } else {
      setTransactions([]);
      setDreams([]);
      setGoals([]);
      setCredits([]);
    }
  }, [user]);

  return (
    <SyncContext.Provider value={{
      transactions,
      dreams,
      goals,
      credits,
      isLoading,
      syncData,
      addTransaction,
      deleteTransaction,
    }}>
      {children}
    </SyncContext.Provider>
  );
}

export const useSync = () => useContext(SyncContext);
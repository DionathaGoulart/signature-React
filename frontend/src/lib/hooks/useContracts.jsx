import { createContext, useContext, useMemo, useState } from 'react';
import { contractsService } from '../services/contractsService';

const ContractsCtx = createContext();

export function ContractsProvider({ children }) {
  const [contracts, setContracts] = useState(() => contractsService.list());

  const api = useMemo(() => ({
    contracts,
    
    create(contract) {
      contractsService.save(contract);
      setContracts(contractsService.list());
    },
    
    refresh() {
      setContracts(contractsService.list());
    },
    
    find(id) {
      return contractsService.findById(id);
    },
    
    remove(id) {
      contractsService.remove(id);
      setContracts(contractsService.list());
    }
  }), [contracts]);

  return (
    <ContractsCtx.Provider value={api}>
      {children}
    </ContractsCtx.Provider>
  );
}

export const useContracts = () => useContext(ContractsCtx);
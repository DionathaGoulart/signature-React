export const contractsService = {
  list() {
    try {
      const stored = window.localStorage.getItem('contracts');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  save(contract) {
    const contracts = this.list();
    contracts.push(contract);
    window.localStorage.setItem('contracts', JSON.stringify(contracts));
    return contract;
  },

  findById(id) {
    const contracts = this.list();
    return contracts.find(contract => contract.id === id);
  },

  remove(id) {
    const contracts = this.list();
    const updatedContracts = contracts.filter(contract => contract.id !== id);
    window.localStorage.setItem('contracts', JSON.stringify(updatedContracts));
    return updatedContracts;
  }
};
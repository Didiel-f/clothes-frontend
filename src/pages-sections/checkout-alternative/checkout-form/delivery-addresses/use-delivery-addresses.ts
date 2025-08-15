import { useState, useCallback } from "react";
// CUSTOM DATA MODEL
import Address from "models/Address.model";

export default function useDeliveryAddresses() {
  const [openModal, setOpenModal] = useState(false);
  const [editDeliveryAddress, setEditDeliveryAddress] = useState<Address | undefined>(
    undefined
  );

  const toggleModal = useCallback(() => setOpenModal((prev) => !prev), []);

  const handleDeleteDeliveryAddress = useCallback((id: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
    }
  }, []);

  const handleAddNewAddress = useCallback(() => {
    setEditDeliveryAddress(undefined);
    setOpenModal(true);
  }, []);

  const handleEditDeliveryAddress = useCallback((address: Address) => {
    setEditDeliveryAddress(address);
    setOpenModal(true);
  }, []);

  return {
    openModal,
    editDeliveryAddress,
    toggleModal,
    handleAddNewAddress,
    handleEditDeliveryAddress,
    handleDeleteDeliveryAddress
  };
}

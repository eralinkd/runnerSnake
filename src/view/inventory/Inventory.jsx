import { useState } from 'react';
import ComponentWithBorder from '../../shared/ComponentWithBorder/ComponentWithBorder';
import testImg from '../../assets/inventory/snake_probe.png';
import testItem from '../../assets/store/tets.png';
import EquipmentModal from './EquipmentModal/EquipmentModal';
import clsx from 'clsx';
import styles from './Inventory.module.scss';
import inventoryModalState from '../../state/inventoryModalState';
import Eggs from './Eggs/Eggs';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../api/userApi';
import Spinner from '../../shared/Spinner/Spinner';

const EQUIPMENT_TYPES = {
  HELMET: 'helmet',
  ARMOR: 'armor',
  WEAPON: 'weapon',
  SHIELD: 'shield',
};

const Inventory = () => {
  const openModal = inventoryModalState((state) => state.openModal);
  const closeModal = inventoryModalState((state) => state.closeModal);
  const [selectedEquipment, setSelectedEquipment] = useState({
    [EQUIPMENT_TYPES.HELMET]: null,
    [EQUIPMENT_TYPES.ARMOR]: null,
    [EQUIPMENT_TYPES.WEAPON]: null,
    [EQUIPMENT_TYPES.SHIELD]: null,
  });
  const [activeTab, setActiveTab] = useState('equipment');

  const {
    data: userData,
    isLoading,
    isError,
    refetch: refetchInventory,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 0,
  });

  const handleEquipmentSelect = (type, item) => {
    setSelectedEquipment((prev) => ({
      ...prev,
      [type]: item,
    }));
    closeModal();
  };

  const renderEquipmentSlot = (type, label) => (
    <ComponentWithBorder className={clsx(styles.slotWrapper, styles[type])}>
      <div
        className={clsx(styles.slot)}
        onClick={() =>
          openModal(type, selectedEquipment[type], (item) =>
            handleEquipmentSelect(type, item)
          )
        }
      >
        <div className={styles.imgContainer}>
          {selectedEquipment[type] ? (
            <img
              src={selectedEquipment[type].image}
              alt={selectedEquipment[type].name}
            />
          ) : (
            <img src={testItem} alt="no selected" />
          )}
        </div>
        <span>{label}</span>
      </div>
    </ComponentWithBorder>
  );

  const renderEquipmentContent = () => (
    <div className={styles.equipmentContainer}>
      <div className={styles.slots}>
        {renderEquipmentSlot(
          EQUIPMENT_TYPES.HELMET,
          selectedEquipment[EQUIPMENT_TYPES.HELMET]?.name || 'Шлем не выбран'
        )}
        {renderEquipmentSlot(
          EQUIPMENT_TYPES.ARMOR,
          selectedEquipment[EQUIPMENT_TYPES.ARMOR]?.name || 'Броня не выбрана'
        )}
        {renderEquipmentSlot(
          EQUIPMENT_TYPES.WEAPON,
          selectedEquipment[EQUIPMENT_TYPES.WEAPON]?.name || 'Оружие не выбрано'
        )}
        {renderEquipmentSlot(
          EQUIPMENT_TYPES.SHIELD,
          selectedEquipment[EQUIPMENT_TYPES.SHIELD]?.name || 'Щит не выбран'
        )}
      </div>
      <div className={styles.character}>
        <img src={testImg} alt="snake" />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.errorContainer}>
        <p className="error">Не удалось загрузить данные</p>
      </div>
    );
  }

  return (
    <>
      {userData?.inventory && (
        <div className={styles.inventory}>
          <div className={styles.tabs}>
            <button
              className={clsx(
                styles.tab,
                activeTab === 'equipment' && styles.active
              )}
              onClick={() => setActiveTab('equipment')}
            >
              Снаряжение
            </button>
            <button
              className={clsx(
                styles.tab,
                activeTab === 'eggs' && styles.active
              )}
              onClick={() => setActiveTab('eggs')}
            >
              Яйца
            </button>
          </div>

          {activeTab === 'equipment' ? (
            renderEquipmentContent()
          ) : (
            <Eggs
              eggs={userData?.inventory?.eggs}
              refetchInventory={refetchInventory}
            />
          )}

          <EquipmentModal />
        </div>
      )}
    </>
  );
};

export default Inventory;

import { useState } from 'react';
import ComponentWithBorder from '../../shared/ComponentWithBorder/ComponentWithBorder';
import testImg from '../../assets/inventory/snake_probe.png';
import testItem from '../../assets/store/tets.png';
import EquipmentModal from './EquipmentModal/EquipmentModal';
import clsx from 'clsx';
import styles from './Inventory.module.scss';
import inventoryModalState from '../../state/inventoryModalState';

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

  const handleEquipmentSelect = (type, item) => {
    setSelectedEquipment((prev) => ({
      ...prev,
      [type]: item,
    }));
    closeModal();
  };

  // слот под одежду
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

  return (
    <div className={styles.inventory}>
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
            selectedEquipment[EQUIPMENT_TYPES.WEAPON]?.name ||
              'Оружие не выбрано'
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

      <EquipmentModal />
    </div>
  );
};

export default Inventory;

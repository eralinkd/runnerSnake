import Modal from '../../../shared/Modal/Modal';
import ComponentWithBorder from '../../../shared/ComponentWithBorder/ComponentWithBorder';
import inventoryModalState from '../../../state/inventoryModalState';
import testImage from '../../../assets/store/tets.png';
import clsx from 'clsx';
import styles from './EquipmentModal.module.scss';

const EquipmentModal = () => {
  const {
    isOpen,
    modalData: { type, selectedItem, onSelect },
    closeModal,
  } = inventoryModalState((state) => state);

  // Здесь будем получать список доступной экипировки в зависимости от типа
  const items = [
    {
      id: 1132,
      name: 'Item name 1',
      image: testImage,
    },
    { id: 2333, name: 'Item name 2', image: testImage },
  ];

  const typeLabels = {
    helmet: 'Шлемы',
    armor: 'Броня',
    weapon: 'Оружие',
    shield: 'Щиты',
  };

  return (
    <Modal isOpen={isOpen} handleClose={closeModal} className={styles.modal}>
      <div className={styles.equipmentModal}>
        <Modal.Close onClick={closeModal} className={styles.close} />
        <h2 className={styles.title}>{typeLabels[type]}</h2>

        <ul className={styles.itemsList}>
          {selectedItem && (
            <ComponentWithBorder className={clsx(styles.item, styles.selected)}>
              <li className={clsx(styles.slot, styles.selected)}>
                <span className={styles.selectedMark}>Выбрано</span>
                <div className={styles.imgContainer}>
                  <img src={selectedItem.image} alt={selectedItem.name} />
                </div>
                <p>{selectedItem.name}</p>
              </li>
            </ComponentWithBorder>
          )}

          {items.map((item) => (
            <ComponentWithBorder
              key={item.id}
              className={clsx(
                styles.item,
                selectedItem?.id === item.id && styles.hidden
              )}
            >
              <li className={clsx(styles.slot)} onClick={() => onSelect(item)}>
                <div className={styles.imgContainer}>
                  <img src={item.image} alt={item.name} />
                </div>
                <p>{item.name}</p>
              </li>
            </ComponentWithBorder>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default EquipmentModal;

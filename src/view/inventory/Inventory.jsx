import { useState } from 'react';
import ComponentWithBorder from '../../shared/ComponentWithBorder/ComponentWithBorder';
import testImg from '../../assets/inventory/snake_probe.png';
import testItem from '../../assets/store/tets.png';
import EquipmentModal from './EquipmentModal/EquipmentModal';
import clsx from 'clsx';
import styles from './Inventory.module.scss';
import inventoryModalState from '../../state/inventoryModalState';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const EQUIPMENT_TYPES = {
  HELMET: 'helmet',
  ARMOR: 'armor',
  WEAPON: 'weapon',
  SHIELD: 'shield',
};

const TEST_SLIDES = [
  { id: 1, title: 'Слайд 1', image: testImg },
  { id: 2, title: 'Слайд 2', image: testImg },
  { id: 3, title: 'Слайд 3', image: testImg },
  { id: 4, title: 'Слайд 4', image: testImg },
  { id: 5, title: 'Слайд 5', image: testImg },
  { id: 6, title: 'Слайд 6', image: testImg },
  { id: 7, title: 'Слайд 7', image: testImg },
  { id: 8, title: 'Слайд 8', image: testImg },
  { id: 9, title: 'Слайд 9', image: testImg },
  { id: 10, title: 'Слайд 10', image: testImg },
];

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

  const renderSliderContent = () => (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className={styles.swiper}
      >
        {TEST_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.slide}>
            <div className={styles.slideContent}>
              <img src={slide.image} alt={slide.title} />
              <h3>{slide.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  return (
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
          className={clsx(styles.tab, activeTab === 'eggs' && styles.active)}
          onClick={() => setActiveTab('slider')}
        >
          Слайдер
        </button>
      </div>

      {activeTab === 'equipment'
        ? renderEquipmentContent()
        : renderSliderContent()}

      <EquipmentModal />
    </div>
  );
};

export default Inventory;

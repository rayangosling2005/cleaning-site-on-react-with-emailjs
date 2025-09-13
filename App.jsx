import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './index.css';

/**
 * Главный компонент приложения - лендинг страница клининговой компании
 * Содержит навигацию, секции услуг, модальное окно для записи и контактную информацию
 */
export default function App() {
  // Состояние для управления видимостью модального окна записи на услуги
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Состояние для формы
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  /**
   * Функция для плавной прокрутки к указанной секции страницы
   * @param {string} sectionId - ID секции, к которой нужно прокрутить
   */
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Функция для открытия модального окна записи на услуги
   */
  const openModal = () => {
    setIsModalOpen(true);
  };

  /**
   * Функция для закрытия модального окна записи на услуги
   */
  const closeModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Функция для прокрутки наверх страницы
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Функция для валидации email адреса
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Функция для обработки изменения полей формы
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Функция для обработки отправки формы записи на услуги через EmailJS
   */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Проверка валидности email
    if (!isValidEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Замените эти значения на ваши реальные данные EmailJS
    const serviceID = 'service_dkgrc5k';
    const templateID = 'template_qdvrivm';
    const publicKey = 'n0uuh8mh9tWgDmprz';
    
    try {
      await emailjs.send(serviceID, templateID, {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_email: 'kostya.krava2608@gmail.com' // Ваш email для получения заявок
      }, publicKey);
      
      alert('Request submitted successfully! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      closeModal();
    } catch (error) {
      console.error('Ошибка отправки:', error);
      console.error('Детали ошибки:', error.text || error.message);
      alert(`Error sending request: ${error.text || error.message}. Please try again or contact us by phone.`);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen font-sans">
      {/* Фиксированная навигационная панель */}
      <nav className="fixed top-0 left-0 right-0 bg-orange-500 text-white p-4 shadow-lg z-40 flex justify-between items-center">
        <h1 className="text-xl font-bold">Perfect Home Cleaning</h1>
        <div className="space-x-4">
          {/* Кнопка навигации к главной секции */}
          <button onClick={() => scrollToSection('home')} className="hover:underline hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
            Home
          </button>
          {/* Кнопка навигации к секции услуг */}
          <button onClick={() => scrollToSection('services')} className="hover:underline hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
            Services
          </button>
          {/* Кнопка навигации к секции о компании */}
          <button onClick={() => scrollToSection('about')} className="hover:underline hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
            About Us
          </button>
          {/* Кнопка навигации к контактной секции */}
          <button onClick={() => scrollToSection('contact')} className="hover:underline hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
            Contact
          </button>
        </div>
      </nav>

      {/* Отступ для фиксированной навигации */}
      <div className="pt-20"></div>

      {/* Главная секция с призывом к действию */}
      <section id="home" className="text-center p-12 bg-white shadow-sm">
        <h2 className="text-4xl font-bold mb-4">We Make Homes Shine</h2>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Professional cleaning services to prepare your home for rent or sale. Deep cleaning, eco-friendly products, and fast results.
        </p>
        {/* Главная кнопка для записи на услуги */}
        <button onClick={openModal} className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          Book a Cleaning
        </button>
        
        {/* Дополнительная информация */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl mb-2">🧽</div>
            <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
            <p className="text-gray-600">We use only safe, environmentally friendly cleaning products that are safe for your family and pets.</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast Service</h3>
            <p className="text-gray-600">Most cleaning jobs completed within 2-4 hours. We work efficiently without compromising quality.</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🛡️</div>
            <h3 className="text-xl font-semibold mb-2">Insured & Bonded</h3>
            <p className="text-gray-600">Fully licensed, insured, and bonded for your peace of mind. Your property is protected.</p>
          </div>
        </div>
      </section>

      {/* Секция с описанием услуг компании */}
      <section id="services" className="p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Cleaning Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Карточка услуги - уборка кухни */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop" alt="Clean Kitchen After Service" className="rounded-lg mb-4 w-full h-48 object-cover" />
              <h3 className="text-xl font-bold mb-3">Kitchen Cleaning</h3>
              <p className="text-gray-600 mb-4">Deep cleaning for kitchens: appliances, counters, cabinets — ready for the next owner or tenant.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Clean all appliances inside and out</li>
                <li>• Sanitize countertops and surfaces</li>
                <li>• Clean cabinets and drawers</li>
                <li>• Remove grease and grime</li>
              </ul>
            </div>
            {/* Карточка услуги - глубокая уборка */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop" alt="Clean Apartment After Service" className="rounded-lg mb-4 w-full h-48 object-cover" />
              <h3 className="text-xl font-bold mb-3">Deep Cleaning Service</h3>
              <p className="text-gray-600 mb-4">Complete deep cleaning including bathrooms, kitchens, living areas. We sanitize, remove stains, and make every corner spotless.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Bathroom deep sanitization</li>
                <li>• Kitchen deep cleaning</li>
                <li>• Living area cleaning</li>
                <li>• Baseboards and trim</li>
              </ul>
            </div>
            {/* Карточка услуги - полная уборка квартиры */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" alt="Clean Living Room After Service" className="rounded-lg mb-4 w-full h-48 object-cover" />
              <h3 className="text-xl font-bold mb-3">Full Apartment Service</h3>
              <p className="text-gray-600 mb-4">Complete cleaning service for your entire apartment or house before renting or selling.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Every room cleaned</li>
                <li>• Windows and mirrors</li>
                <li>• Floor cleaning and mopping</li>
                <li>• Move-in/move-out ready</li>
              </ul>
            </div>
          </div>
          
          {/* Дополнительные услуги */}
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-center">Additional Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🪟</div>
                <h4 className="font-semibold mb-2">Window Cleaning</h4>
                <p className="text-sm text-gray-600">Interior and exterior window cleaning for crystal clear views.</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🧺</div>
                <h4 className="font-semibold mb-2">Laundry Service</h4>
                <p className="text-sm text-gray-600">Wash, dry, and fold your linens and towels.</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🌿</div>
                <h4 className="font-semibold mb-2">Eco Products</h4>
                <p className="text-sm text-gray-600">100% natural and safe cleaning products.</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📅</div>
                <h4 className="font-semibold mb-2">Flexible Scheduling</h4>
                <p className="text-sm text-gray-600">Available 7 days a week, including evenings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Секция с информацией о компании */}
      <section id="about" className="bg-white p-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">About Perfect Home Cleaning</h2>
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              We are a professional cleaning company with over 5 years of experience in preparing homes for rent and sale. 
              Our team uses eco-friendly products and modern equipment to ensure your property looks its absolute best.
            </p>
          </div>
          
          {/* Статистика компании */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-500 mb-2">500+</div>
              <p className="font-semibold">Homes Cleaned</p>
            </div>
            <div className="text-center bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-500 mb-2">5+</div>
              <p className="font-semibold">Years Experience</p>
            </div>
            <div className="text-center bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
              <p className="font-semibold">Satisfied Customers</p>
            </div>
            <div className="text-center bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-500 mb-2">24/7</div>
              <p className="font-semibold">Customer Support</p>
            </div>
          </div>

          {/* Наша команда и процесс */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Our Team</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">👥</div>
                  <div>
                    <h4 className="font-semibold">Professional Staff</h4>
                    <p className="text-gray-600">Our team consists of trained, experienced cleaners who are background-checked and fully insured.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🎓</div>
                  <div>
                    <h4 className="font-semibold">Continuous Training</h4>
                    <p className="text-gray-600">Regular training sessions ensure our team stays updated with the latest cleaning techniques and safety protocols.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🛡️</div>
                  <div>
                    <h4 className="font-semibold">Bonded & Insured</h4>
                    <p className="text-gray-600">Full liability insurance and bonding protect your property and give you complete peace of mind.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Our Process</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">Free Consultation</h4>
                    <p className="text-gray-600">We assess your property and provide a detailed quote with no hidden fees.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">Scheduled Service</h4>
                    <p className="text-gray-600">We arrive on time with all necessary equipment and eco-friendly supplies.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">Quality Check</h4>
                    <p className="text-gray-600">Every job is inspected to ensure it meets our high standards before completion.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold">Follow-up</h4>
                    <p className="text-gray-600">We follow up to ensure your complete satisfaction with our service.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция с ценами */}
      <section className="bg-gray-50 p-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing & Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Базовый пакет */}
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <h3 className="text-2xl font-bold mb-4">Basic Clean</h3>
              <div className="text-4xl font-bold text-orange-500 mb-6">Your Price</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Kitchen cleaning
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Bathroom cleaning
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Living room cleaning
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Basic floor cleaning
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Up to 2 hours
                </li>
              </ul>
              <button onClick={openModal} className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                Book Now
              </button>
            </div>

            {/* Стандартный пакет */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center border-2 border-orange-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Deep Clean</h3>
              <div className="text-4xl font-bold text-orange-500 mb-6">Your Price</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Everything in Basic Clean
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Deep bathroom sanitization
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Appliance deep cleaning
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Window cleaning
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Baseboards & trim
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Up to 4 hours
                </li>
              </ul>
              <button onClick={openModal} className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors">
                Book Now
              </button>
            </div>

            {/* Премиум пакет */}
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <h3 className="text-2xl font-bold mb-4">Move-in/Move-out</h3>
              <div className="text-4xl font-bold text-orange-500 mb-6">Your Price</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Everything in Deep Clean
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Inside all cabinets
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Light fixture cleaning
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Wall washing
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Laundry service included
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Up to 6 hours
                </li>
              </ul>
              <button onClick={openModal} className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                Book Now
              </button>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All prices include eco-friendly products and equipment</p>
            <p className="text-sm text-gray-500">*Prices may vary based on property size and condition. Contact us for a free quote!</p>
          </div>
        </div>
      </section>

      {/* Модальное окно для записи на услуги */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full relative">
            {/* Кнопка закрытия модального окна */}
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-2xl font-bold leading-none w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Close modal"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Book a Cleaning</h2>
            {/* Форма для записи на услуги */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input 
                type="text" 
                name="name"
                placeholder="Enter your name" 
                value={formData.name}
                onChange={handleInputChange}
                required
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" 
              />
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email" 
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`border w-full p-2 rounded focus:outline-none focus:ring-2 ${
                  formData.email && !isValidEmail(formData.email) 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-orange-500'
                }`}
              />
              {formData.email && !isValidEmail(formData.email) && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
              )}
              <input 
                type="tel" 
                name="phone"
                placeholder="Enter your phone" 
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" 
              />
              <textarea 
                name="message"
                placeholder="Describe your request" 
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="4"
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" 
              />
              {/* Кнопка отправки формы */}
              <button 
                type="submit" 
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Кнопка "Наверх" */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-orange-500 text-white w-12 h-12 rounded-full shadow-lg hover:bg-orange-600 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 z-30"
        aria-label="Scroll to top"
      >
        ↑
      </button>

      {/* Футер с контактной информацией */}
      <footer id="contact" className="bg-gray-800 text-white p-12 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Контактная информация */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start">
                  <span className="text-orange-500 mr-3">📞</span>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-300">Your Phone</p>
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <span className="text-orange-500 mr-3">✉️</span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-300">Your Email</p>
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <span className="text-orange-500 mr-3">📍</span>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-300">Your Address</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Часы работы */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-gray-300">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-gray-300">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-gray-300">10:00 AM - 3:00 PM</span>
                </div>
                <div className="mt-4 p-3 bg-orange-500 bg-opacity-20 rounded-lg">
                  <p className="text-sm font-semibold">Emergency Service Available</p>
                  <p className="text-xs text-gray-300">24/7 for urgent cleaning needs</p>
                </div>
              </div>
            </div>

            {/* Быстрые ссылки */}
            <div className="text-center md:text-right">
              <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
              <div className="space-y-3">
                <button onClick={() => scrollToSection('services')} className="block w-full text-center md:text-right hover:text-orange-500 transition-colors">
                  Our Services
                </button>
                <button onClick={() => scrollToSection('about')} className="block w-full text-center md:text-right hover:text-orange-500 transition-colors">
                  About Us
                </button>
                <button onClick={openModal} className="block w-full text-center md:text-right hover:text-orange-500 transition-colors">
                  Book a Service
                </button>
                <button onClick={openModal} className="block w-full text-center md:text-right hover:text-orange-500 transition-colors">
                  Get a Quote
                </button>
              </div>
            </div>
          </div>

          {/* Кнопка для записи */}
          <div className="text-center border-t border-gray-700 pt-8">
            <button onClick={openModal} className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              Get a Free Quote Today
            </button>
            <p className="text-gray-400 text-sm mt-4">© 2024 Perfect Home Cleaning. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
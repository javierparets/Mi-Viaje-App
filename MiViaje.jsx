import React, { useState, useEffect } from 'react';
import { MapPin, DollarSign, Calendar, Backpack, FileText, Camera, Plus, Edit2, Trash2, ChevronDown, ChevronUp, Globe, Home } from 'lucide-react';

const MiViaje = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [countries, setCountries] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [packingList, setPackingList] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [totalBudget, setTotalBudget] = useState(5000);
  const [expandedCountry, setExpandedCountry] = useState(null);

  // Cargar datos del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('miViajeData');
    if (saved) {
      const data = JSON.parse(saved);
      setCountries(data.countries || []);
      setExpenses(data.expenses || []);
      setAttractions(data.attractions || []);
      setItinerary(data.itinerary || []);
      setPackingList(data.packingList || []);
      setDocuments(data.documents || []);
      setPhotos(data.photos || []);
      setTotalBudget(data.totalBudget || 5000);
    }
  }, []);

  // Guardar datos en localStorage
  useEffect(() => {
    localStorage.setItem('miViajeData', JSON.stringify({
      countries, expenses, attractions, itinerary, packingList, documents, photos, totalBudget
    }));
  }, [countries, expenses, attractions, itinerary, packingList, documents, photos, totalBudget]);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBudget = totalBudget - totalExpenses;
  const budgetPercentage = (totalExpenses / totalBudget) * 100;

  // Funciones para países
  const addCountry = () => {
    const name = prompt('Nombre del país:');
    const startDate = prompt('Fecha de inicio (YYYY-MM-DD):');
    const endDate = prompt('Fecha de fin (YYYY-MM-DD):');
    if (name) {
      setCountries([...countries, { id: Date.now(), name, startDate, endDate }]);
    }
  };

  const deleteCountry = (id) => {
    setCountries(countries.filter(c => c.id !== id));
  };

  // Funciones para gastos
  const addExpense = (countryId) => {
    const description = prompt('Descripción del gasto:');
    const amountStr = prompt('Monto:');
    const category = prompt('Categoría (comida/hospedaje/transporte/entretenimiento/otro):');
    if (description && amountStr) {
      setExpenses([...expenses, {
        id: Date.now(),
        countryId,
        description,
        amount: parseFloat(amountStr),
        category: category || 'otro',
        date: new Date().toISOString().split('T')[0]
      }]);
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  // Funciones para lugares de interés
  const addAttraction = (countryId) => {
    const name = prompt('Nombre del lugar:');
    const description = prompt('Descripción:');
    const hours = prompt('Horario:');
    const price = prompt('Precio:');
    if (name) {
      setAttractions([...attractions, {
        id: Date.now(),
        countryId,
        name,
        description,
        hours,
        price
      }]);
    }
  };

  const deleteAttraction = (id) => {
    setAttractions(attractions.filter(a => a.id !== id));
  };

  // Funciones para itinerario
  const addItineraryItem = () => {
    const date = prompt('Fecha (YYYY-MM-DD):');
    const activity = prompt('Actividad:');
    const time = prompt('Hora (HH:MM):');
    if (date && activity) {
      setItinerary([...itinerary, {
        id: Date.now(),
        date,
        activity,
        time,
        completed: false
      }]);
    }
  };

  const toggleItineraryItem = (id) => {
    setItinerary(itinerary.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItineraryItem = (id) => {
    setItinerary(itinerary.filter(i => i.id !== id));
  };

  // Funciones para packing
  const addPackingItem = () => {
    const item = prompt('¿Qué llevar?:');
    if (item) {
      setPackingList([...packingList, {
        id: Date.now(),
        item,
        packed: false
      }]);
    }
  };

  const togglePackingItem = (id) => {
    setPackingList(packingList.map(item =>
      item.id === id ? { ...item, packed: !item.packed } : item
    ));
  };

  const deletePackingItem = (id) => {
    setPackingList(packingList.filter(i => i.id !== id));
  };

  // Funciones para documentos
  const addDocument = () => {
    const title = prompt('Nombre del documento:');
    const url = prompt('URL o enlace:');
    const notes = prompt('Notas (opcional):');
    if (title) {
      setDocuments([...documents, {
        id: Date.now(),
        title,
        url,
        notes
      }]);
    }
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  // Funciones para fotos
  const addPhoto = () => {
    const description = prompt('Descripción de la foto:');
    const date = prompt('Fecha (YYYY-MM-DD):');
    if (description) {
      setPhotos([...photos, {
        id: Date.now(),
        description,
        date: date || new Date().toISOString().split('T')[0],
        url: null
      }]);
    }
  };

  const deletePhoto = (id) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  // Componente: Dashboard
  const Dashboard = () => (
    <div className="space-y-6 pb-24">
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Mi Viaje</h1>
        <p className="text-blue-100">Planificando aventuras en familia</p>
      </div>

      {/* Presupuesto */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Presupuesto</h2>
          <button
            onClick={() => {
              const newBudget = prompt('Presupuesto total ($):', totalBudget);
              if (newBudget) setTotalBudget(parseFloat(newBudget));
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit2 size={18} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Gasto total</span>
              <span className="text-sm font-semibold text-gray-700">${totalExpenses.toFixed(2)} / ${totalBudget.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all ${budgetPercentage > 100 ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-600 text-sm">Presupuesto disponible</p>
            <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${remainingBudget.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Resumen de países */}
      {countries.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ruta del viaje</h2>
          <div className="space-y-2">
            {countries.map((country, idx) => (
              <div key={country.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-600 font-bold">{idx + 1}</span>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800">{country.name}</p>
                  <p className="text-sm text-gray-600">{country.startDate} → {country.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Próximas actividades */}
      {itinerary.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Próximas actividades</h2>
          <div className="space-y-2">
            {itinerary.slice(0, 3).map(item => (
              <div key={item.id} className="flex items-center gap-3 p-2 text-gray-700">
                <Calendar size={18} className="text-blue-600" />
                <div>
                  <p className="font-semibold">{item.activity}</p>
                  <p className="text-sm text-gray-600">{item.date} {item.time && `a las ${item.time}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Componente: Países y Atracciones
  const CountriesTab = () => (
    <div className="space-y-4 pb-24">
      <button
        onClick={addCountry}
        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <Plus size={20} /> Agregar país
      </button>

      {countries.map(country => {
        const countryExpenses = expenses.filter(e => e.countryId === country.id);
        const countryAttractions = attractions.filter(a => a.countryId === country.id);
        const isExpanded = expandedCountry === country.id;

        return (
          <div key={country.id} className="bg-white rounded-lg shadow overflow-hidden">
            <button
              onClick={() => setExpandedCountry(isExpanded ? null : country.id)}
              className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold flex justify-between items-center hover:from-blue-600 hover:to-blue-700"
            >
              <div className="flex items-center gap-3">
                <Globe size={20} />
                <div className="text-left">
                  <p>{country.name}</p>
                  <p className="text-xs text-blue-100">{country.startDate} → {country.endDate}</p>
                </div>
              </div>
              {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </button>

            {isExpanded && (
              <div className="p-4 space-y-6">
                {/* Gastos del país */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      <DollarSign size={18} className="text-blue-600" /> Gastos
                    </h3>
                    <button
                      onClick={() => addExpense(country.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  {countryExpenses.length > 0 ? (
                    <div className="space-y-2">
                      {countryExpenses.map(expense => (
                        <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-semibold text-gray-800">{expense.description}</p>
                            <p className="text-xs text-gray-600">{expense.category} • {expense.date}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="font-bold text-gray-800">${expense.amount.toFixed(2)}</p>
                            <button
                              onClick={() => deleteExpense(expense.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="p-3 bg-blue-50 rounded font-semibold text-blue-800">
                        Subtotal: ${countryExpenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Sin gastos registrados</p>
                  )}
                </div>

                {/* Lugares de interés */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      <MapPin size={18} className="text-blue-600" /> Lugares de interés
                    </h3>
                    <button
                      onClick={() => addAttraction(country.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  {countryAttractions.length > 0 ? (
                    <div className="space-y-2">
                      {countryAttractions.map(attraction => (
                        <div key={attraction.id} className="p-3 bg-gray-50 rounded">
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-semibold text-gray-800">{attraction.name}</p>
                            <button
                              onClick={() => deleteAttraction(attraction.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          {attraction.description && <p className="text-sm text-gray-700 mb-2">{attraction.description}</p>}
                          <div className="text-xs text-gray-600 space-y-1">
                            {attraction.hours && <p>⏰ {attraction.hours}</p>}
                            {attraction.price && <p>💰 ${attraction.price}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Sin lugares registrados</p>
                  )}
                </div>

                {/* Botón eliminar país */}
                <button
                  onClick={() => deleteCountry(country.id)}
                  className="w-full p-2 text-red-600 hover:bg-red-50 rounded font-semibold flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} /> Eliminar país
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // Componente: Itinerario
  const ItineraryTab = () => (
    <div className="space-y-4 pb-24">
      <button
        onClick={addItineraryItem}
        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <Plus size={20} /> Agregar actividad
      </button>

      <div className="space-y-2">
        {itinerary.sort((a, b) => a.date.localeCompare(b.date)).map(item => (
          <div
            key={item.id}
            className={`p-4 rounded-lg border-l-4 flex justify-between items-start ${
              item.completed
                ? 'bg-gray-50 border-gray-400 opacity-60'
                : 'bg-white border-blue-600 shadow'
            }`}
          >
            <div className="flex-grow">
              <p className={`font-bold ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {item.activity}
              </p>
              <p className="text-sm text-gray-600">{item.date} {item.time && `a las ${item.time}`}</p>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItineraryItem(item.id)}
                className="w-5 h-5 text-blue-600 cursor-pointer"
              />
              <button
                onClick={() => deleteItineraryItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {itinerary.length === 0 && (
        <p className="text-gray-500 text-center py-8">Sin actividades planeadas</p>
      )}
    </div>
  );

  // Componente: Packing
  const PackingTab = () => (
    <div className="space-y-4 pb-24">
      <button
        onClick={addPackingItem}
        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <Plus size={20} /> Agregar item
      </button>

      <div className="space-y-2">
        {packingList.map(item => (
          <div
            key={item.id}
            className={`p-3 rounded-lg flex justify-between items-center ${
              item.packed ? 'bg-green-50 border border-green-200' : 'bg-white border border-gray-200'
            }`}
          >
            <label className="flex items-center gap-3 flex-grow cursor-pointer">
              <input
                type="checkbox"
                checked={item.packed}
                onChange={() => togglePackingItem(item.id)}
                className="w-5 h-5 text-blue-600"
              />
              <span className={item.packed ? 'line-through text-gray-500' : 'text-gray-800'}>
                {item.item}
              </span>
            </label>
            <button
              onClick={() => deletePackingItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {packingList.length > 0 && (
        <div className="p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-gray-600">Progreso de empaque</p>
          <p className="text-2xl font-bold text-blue-600">
            {packingList.filter(i => i.packed).length} / {packingList.length}
          </p>
        </div>
      )}

      {packingList.length === 0 && (
        <p className="text-gray-500 text-center py-8">Sin items en la lista</p>
      )}
    </div>
  );

  // Componente: Documentos
  const DocumentsTab = () => (
    <div className="space-y-4 pb-24">
      <button
        onClick={addDocument}
        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <Plus size={20} /> Agregar documento
      </button>

      <div className="space-y-3">
        {documents.map(doc => (
          <div key={doc.id} className="p-4 bg-white rounded-lg shadow border-l-4 border-blue-600">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-grow">
                <p className="font-bold text-gray-800 flex items-center gap-2">
                  <FileText size={18} className="text-blue-600" />
                  {doc.title}
                </p>
                {doc.notes && <p className="text-sm text-gray-600 mt-1">{doc.notes}</p>}
              </div>
              <button
                onClick={() => deleteDocument(doc.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
            {doc.url && (
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
              >
                Abrir documento →
              </a>
            )}
          </div>
        ))}
      </div>

      {documents.length === 0 && (
        <p className="text-gray-500 text-center py-8">Sin documentos registrados</p>
      )}
    </div>
  );

  // Componente: Fotos
  const PhotosTab = () => (
    <div className="space-y-4 pb-24">
      <button
        onClick={addPhoto}
        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <Plus size={20} /> Agregar foto
      </button>

      <div className="grid grid-cols-1 gap-4">
        {photos.map(photo => (
          <div key={photo.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold text-gray-800 flex items-center gap-2">
                  <Camera size={18} className="text-blue-600" />
                  {photo.description}
                </p>
                <p className="text-sm text-gray-600">{photo.date}</p>
              </div>
              <button
                onClick={() => deletePhoto(photo.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
            {photo.url ? (
              <img src={photo.url} alt={photo.description} className="w-full rounded-lg" />
            ) : (
              <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Sin foto</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <p className="text-gray-500 text-center py-8">Sin fotos registradas</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Contenido principal */}
      <div className="max-w-2xl mx-auto p-4">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'countries' && <CountriesTab />}
        {activeTab === 'itinerary' && <ItineraryTab />}
        {activeTab === 'packing' && <PackingTab />}
        {activeTab === 'documents' && <DocumentsTab />}
        {activeTab === 'photos' && <PhotosTab />}
      </div>

      {/* Barra de navegación */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-2xl mx-auto flex justify-around">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 font-semibold transition-colors ${
              activeTab === 'dashboard'
                ? 'text-blue-600 border-t-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Home size={20} />
            <span className="text-xs">Inicio</span>
          </button>
          <button
            onClick={() => setActiveTab('countries')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 font-semibold transition-colors ${
              activeTab === 'countries'
                ? 'text-blue-600 border-t-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Globe size={20} />
            <span className="text-xs">Países</span>
          </button>
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 font-semibold transition-colors ${
              activeTab === 'itinerary'
                ? 'text-blue-600 border-t-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Calendar size={20} />
            <span className="text-xs">Itinerario</span>
          </button>
          <button
            onClick={() => setActiveTab('packing')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 font-semibold transition-colors ${
              activeTab === 'packing'
                ? 'text-blue-600 border-t-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Backpack size={20} />
            <span className="text-xs">Packing</span>
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 font-semibold transition-colors ${
              activeTab === 'documents'
                ? 'text-blue-600 border-t-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <FileText size={20} />
            <span className="text-xs">Docs</span>
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 font-semibold transition-colors ${
              activeTab === 'photos'
                ? 'text-blue-600 border-t-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Camera size={20} />
            <span className="text-xs">Fotos</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiViaje;

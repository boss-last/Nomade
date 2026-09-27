import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Mail,
  Phone,
  User,
  Shield,
  Plus,
  Minus,
  Sparkles,
  MapPin,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { Destination, Booking } from '../../types';
import { WidgetBadge } from '../WidgetInspectorOverlay';

interface BookingScreenProps {
  preselectedDestId?: string;
  destinations: Destination[];
  onBack: () => void;
  onSubmitBooking: (booking: Booking) => void;
  showInspector?: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  departureDate?: string;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  preselectedDestId,
  destinations,
  onBack,
  onSubmitBooking,
  showInspector = false,
}) => {
  const initialDestId =
    preselectedDestId && destinations.some((d) => d.id === preselectedDestId)
      ? preselectedDestId
      : destinations[0]?.id || '';

  const [selectedDestId, setSelectedDestId] = useState<string>(initialDestId);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelersCount, setTravelersCount] = useState(2);
  const [departureDate, setDepartureDate] = useState('2026-08-10');
  const [experienceLevel, setExperienceLevel] = useState<'Débutant' | 'Intermédiaire' | 'Expert'>('Intermédiaire');
  const [hasInsurance, setHasInsurance] = useState(true);
  const [specialRequests, setSpecialRequests] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDestination = destinations.find((d) => d.id === selectedDestId) || destinations[0];

  const calculateTotal = () => {
    if (!selectedDestination) return 0;
    const base = selectedDestination.price * travelersCount;
    const insurance = hasInsurance ? 65 * travelersCount : 0;
    return base + insurance;
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Le nom et prénom sont obligatoires.';
        if (value.trim().length < 3) return 'Le nom doit contenir au moins 3 caractères.';
        if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value.trim())) return 'Veuillez saisir un nom valide (lettres uniquement).';
        return undefined;

      case 'email':
        if (!value.trim()) return 'L’adresse e-mail est obligatoire.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Format d’e-mail invalide (ex: nom@domaine.com).';
        return undefined;

      case 'phone':
        if (!value.trim()) return 'Le numéro de téléphone est obligatoire.';
        const cleanPhone = value.replace(/[\s.-]/g, '');
        if (cleanPhone.length < 8) return 'Numéro de téléphone trop court (min 8 chiffres).';
        if (!/^\+?[0-9]{8,15}$/.test(cleanPhone)) return 'Format de téléphone invalide.';
        return undefined;

      case 'departureDate':
        if (!value) return 'La date de départ est requise.';
        return undefined;

      default:
        return undefined;
    }
  };

  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      departureDate: true,
    });

    const nameErr = validateField('fullName', fullName);
    const emailErr = validateField('email', email);
    const phoneErr = validateField('phone', phone);
    const dateErr = validateField('departureDate', departureDate);

    const newErrors = {
      fullName: nameErr,
      email: emailErr,
      phone: phoneErr,
      departureDate: dateErr,
    };

    setErrors(newErrors);

    if (nameErr || emailErr || phoneErr || dateErr) {
      return;
    }

    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (_) {}

    const newBooking: Booking = {
      id: `res-${Date.now()}`,
      destinationId: selectedDestination.id,
      destinationTitle: selectedDestination.title,
      destinationCountry: selectedDestination.country,
      destinationImageUrl: selectedDestination.imageUrl,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      travelersCount,
      departureDate,
      experienceLevel,
      hasInsurance,
      specialRequests: specialRequests.trim() || undefined,
      totalPrice: calculateTotal(),
      status: 'Confirmée',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTimeout(() => {
      onSubmitBooking(newBooking);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 overflow-y-auto">
      {/* Flutter AppBar */}
      <WidgetBadge name="AppBar" enabled={showInspector}>
        <header className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Formulaire de Réservation
            </h1>
            <p className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
              GlobalKey&lt;FormState&gt; · Validation active
            </p>
          </div>
        </header>
      </WidgetBadge>

      {/* Form Container */}
      <WidgetBadge name="Form" enabled={showInspector}>
        <form onSubmit={handleSubmit} className="p-4 space-y-4 pb-28">
          {/* Destination Selector Card */}
          <WidgetBadge name="DropdownButtonFormField" enabled={showInspector}>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700">
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Destination d'expédition
              </label>
              <div className="relative">
                <select
                  value={selectedDestId}
                  onChange={(e) => setSelectedDestId(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title} ({d.country}) — {d.price} €
                    </option>
                  ))}
                </select>
              </div>

              {selectedDestination && (
                <div className="mt-2.5 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <MapPin size={12} className="text-teal-600 dark:text-teal-400" />
                  <span>
                    {selectedDestination.durationDays} jours · {selectedDestination.difficulty} ·{' '}
                    {selectedDestination.price} € / personne
                  </span>
                </div>
              )}
            </div>
          </WidgetBadge>

          {/* Validation Banner Note */}
          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200/70 dark:border-teal-800/50 flex items-start gap-2 text-xs text-teal-800 dark:text-teal-300">
            <FileCheck size={16} className="text-teal-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Validation Flutter en temps réel</strong> : Vérification des champs nom, e-mail et téléphone selon les spécifications.
            </p>
          </div>

          {/* Field 1: Full Name */}
          <WidgetBadge name="TextFormField (Nom)" enabled={showInspector}>
            <div className="space-y-1">
              <label className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Nom complet *</span>
                {touched.fullName && !errors.fullName && (
                  <span className="text-[10px] text-emerald-600 flex items-center gap-0.5">
                    <CheckCircle size={10} /> Valide
                  </span>
                )}
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (touched.fullName) handleBlur('fullName', e.target.value);
                  }}
                  onBlur={() => handleBlur('fullName', fullName)}
                  placeholder="Ex: Éléonore de Belleville"
                  className={`w-full pl-10 pr-3 py-2.5 bg-white dark:bg-slate-800 border rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all ${
                    touched.fullName && errors.fullName
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                      : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-teal-500/30'
                  }`}
                />
              </div>
              {touched.fullName && errors.fullName && (
                <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle size={11} /> {errors.fullName}
                </p>
              )}
            </div>
          </WidgetBadge>

          {/* Field 2: Email */}
          <WidgetBadge name="TextFormField (Email)" enabled={showInspector}>
            <div className="space-y-1">
              <label className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Adresse e-mail *</span>
                {touched.email && !errors.email && (
                  <span className="text-[10px] text-emerald-600 flex items-center gap-0.5">
                    <CheckCircle size={10} /> Valide
                  </span>
                )}
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (touched.email) handleBlur('email', e.target.value);
                  }}
                  onBlur={() => handleBlur('email', email)}
                  placeholder="nom@exemple.com"
                  className={`w-full pl-10 pr-3 py-2.5 bg-white dark:bg-slate-800 border rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all ${
                    touched.email && errors.email
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                      : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-teal-500/30'
                  }`}
                />
              </div>
              {touched.email && errors.email && (
                <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle size={11} /> {errors.email}
                </p>
              )}
            </div>
          </WidgetBadge>

          {/* Field 3: Phone */}
          <WidgetBadge name="TextFormField (Téléphone)" enabled={showInspector}>
            <div className="space-y-1">
              <label className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Numéro de mobile *</span>
                {touched.phone && !errors.phone && (
                  <span className="text-[10px] text-emerald-600 flex items-center gap-0.5">
                    <CheckCircle size={10} /> Valide
                  </span>
                )}
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (touched.phone) handleBlur('phone', e.target.value);
                  }}
                  onBlur={() => handleBlur('phone', phone)}
                  placeholder="+33 6 12 34 56 78"
                  className={`w-full pl-10 pr-3 py-2.5 bg-white dark:bg-slate-800 border rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all ${
                    touched.phone && errors.phone
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                      : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-teal-500/30'
                  }`}
                />
              </div>
              {touched.phone && errors.phone && (
                <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle size={11} /> {errors.phone}
                </p>
              )}
            </div>
          </WidgetBadge>

          {/* Field 4: Travelers Stepper */}
          <WidgetBadge name="Row / Stepper" enabled={showInspector}>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                  Nombre de participants
                </span>
                <span className="text-[11px] text-slate-400">De 1 à 8 aventuriers</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={travelersCount <= 1}
                  onClick={() => setTravelersCount((c) => Math.max(1, c - 1))}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-40 hover:bg-slate-200 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center text-sm font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                  {travelersCount}
                </span>
                <button
                  type="button"
                  disabled={travelersCount >= 8}
                  onClick={() => setTravelersCount((c) => Math.min(8, c + 1))}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-40 hover:bg-slate-200 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </WidgetBadge>

          {/* Field 5: Departure Date Picker */}
          <WidgetBadge name="DatePicker" enabled={showInspector}>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Date de départ souhaitée *
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  value={departureDate}
                  min="2026-04-01"
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                />
              </div>
            </div>
          </WidgetBadge>

          {/* Field 6: Experience Level (Segmented buttons) */}
          <WidgetBadge name="SegmentedButton" enabled={showInspector}>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Niveau physique & autonomie
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Débutant', 'Intermédiaire', 'Expert'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setExperienceLevel(lvl)}
                    className={`py-2 px-2 rounded-xl text-xs font-medium text-center transition-all ${
                      experienceLevel === lvl
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </WidgetBadge>

          {/* Field 7: SwitchListTile (Insurance) */}
          <WidgetBadge name="SwitchListTile" enabled={showInspector}>
            <div
              onClick={() => setHasInsurance(!hasInsurance)}
              className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer select-none"
            >
              <div className="flex items-start gap-2.5 pr-2">
                <Shield size={18} className="text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Assurance Rapatriement (+65 € / pers.)
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Annulation sans frais et assistance médicale héliportée.
                  </p>
                </div>
              </div>

              <div
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                  hasInsurance ? 'bg-teal-600' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                    hasInsurance ? 'translate-x-5.5' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </div>
          </WidgetBadge>

          {/* Field 8: Notes */}
          <WidgetBadge name="TextFormField (Multiligne)" enabled={showInspector}>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Précisions médicales ou régime (optionnel)
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={2}
                placeholder="Ex: Régime végétarien, allergie au pollen, chambre individuelle..."
                className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
              />
            </div>
          </WidgetBadge>

          {/* Price Breakdown Preview */}
          <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl space-y-1 text-xs">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>
                Tarif base ({travelersCount} × {selectedDestination?.price} €) :
              </span>
              <span className="tabular-nums font-semibold">
                {(selectedDestination?.price || 0) * travelersCount} €
              </span>
            </div>
            {hasInsurance && (
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Assurance ({travelersCount} × 65 €) :</span>
                <span className="tabular-nums font-semibold">{65 * travelersCount} €</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-sm text-slate-900 dark:text-slate-100">
              <span>Total de la réservation :</span>
              <span className="text-teal-600 dark:text-teal-400 tabular-nums">
                {calculateTotal()} €
              </span>
            </div>
          </div>

          {/* Form Submit Button */}
          <WidgetBadge name="FilledButton" enabled={showInspector}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-98 text-white font-bold text-xs shadow-md shadow-teal-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle size={16} />
              <span>Valider la réservation ({calculateTotal()} €)</span>
            </button>
          </WidgetBadge>
        </form>
      </WidgetBadge>
    </div>
  );
};

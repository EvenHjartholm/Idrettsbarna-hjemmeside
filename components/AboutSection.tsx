import React from 'react';
import { Heart, Activity, Thermometer, Smile, ShieldCheck, Users } from 'lucide-react';

const AboutSection: React.FC = () => {
  const benefits = [
    {
      icon: Activity,
      title: "Motorisk utvikling",
      text: "Vannets oppdrift gir bevegelsesfrihet som styrker muskler, balanse og kjernemuskulatur. Dette hjelper barnet med milepæler som å rulle, sitte og krabbe."
    },
    {
      icon: Heart,
      title: "Styrker båndet",
      text: "Babysvømming er en aktivitet med 100% fokus på hverandre uten digitale distraksjoner. Dette bygger nærhet, tillit og trygghet mellom foreldre og barn."
    },
    {
      icon: Users,
      title: "Sosial trening",
      text: "Barnet møter jevnaldrende og foreldre utveksler erfaringer. Det er ikke uvanlig at barnas første badekompiser blir lekevenner over flere år."
    },
    {
      icon: Thermometer,
      title: "34 grader i vannet",
      text: "Vi bruker Terapibassenget i Asker som holder behagelige 32–34 grader. Dette sikrer at de små (fra 6 uker) føler seg komfortable og trygge."
    },
    {
      icon: ShieldCheck,
      title: "Trygghet & Selvberging",
      text: "Målet er at barnet skal bli trygg både over og under vann. Vi øver på selvbergingsferdigheter for å gjøre barnet rustet i uønskede situasjoner."
    },
    {
      icon: Smile,
      title: "Bedre søvn & Matlyst",
      text: "Mange foreldre opplever at den fysiske utfoldelsen i vannet gir ro, bedre matlyst og dypere søvn etter aktiviteten."
    }
  ];

  return (
    <section className="py-24 bg-secondary border-t border-border relative overflow-hidden transition-colors duration-500">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Intro Text based on "Babysvømming i Asker: en trygg start" */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-base text-accent font-semibold tracking-wide uppercase">Vår Filosofi</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-txt-primary sm:text-4xl">
            Babysvømming i Asker – En trygg start for de små
          </p>
          <p className="mt-6 text-xl text-txt-secondary leading-relaxed">
            Nærheten til vann har alltid fascinert både små og store. Babysvømming hos Idrettsbarna handler om mer enn bare å bade;
            det handler om å skape en trygg relasjon til vannet fra spedbarnsalder.
            Gjennom lek, sang og trygge rammer legger vi grunnlaget for svømmeglede som varer livet ut.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex flex-col items-start p-6 bg-primary/50 rounded-2xl border border-border hover:border-accent/30 transition-colors">
                <div className="p-3 bg-accent/10 rounded-xl mb-4">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-txt-primary mb-3">{benefit.title}</h3>
                <p className="text-txt-secondary leading-relaxed">
                  {benefit.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Extra info block about Safety/Learning */}
        <div className="mt-20 bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 md:p-12 border border-border shadow-2xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h3 className="text-2xl font-bold text-txt-primary">Hva lærer man egentlig?</h3>
              <p className="text-txt-secondary leading-relaxed">
                Det populære tiltaket byr på en rekke utviklingsmuligheter. Vi introduserer babyene gradvis for:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-xs">1</span>
                  <div>
                    <strong className="text-txt-primary block">Vanntilvenning</strong>
                    <span className="text-txt-secondary text-sm">Gjøre barnet kjent med temperatur, vektløshet og bevegelse i vann.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-xs">2</span>
                  <div>
                    <strong className="text-txt-primary block">Pusterefleks & Dykking</strong>
                    <span className="text-txt-secondary text-sm">Mange babyer har en naturlig dykkerrefleks som kan stimuleres og gradvis trenes i trygge omgivelser.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-xs">3</span>
                  <div>
                    <strong className="text-txt-primary block">Vannvett</strong>
                    <span className="text-txt-secondary text-sm">Holde seg fast, ligge på ryggen og finne veien til kanten er store steg mot å bli trygg.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex-1 relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-lg border border-border">
                <img
                  src="/images/group_lake_bw.jpg"
                  alt="Barn ved vannkanten"
                  className="object-cover w-full h-full opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
                  <p className="text-txt-primary font-medium italic">"En leken og trygg ramme for de viktigste øyeblikkene."</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Shield, Database, Globe, Clock, UserCheck, Cookie } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Personvernerklæring.
 *
 * Egen side med fast adresse, ikke en modal: erklæringen skal kunne lenkes
 * til, bokmerkes og finnes igjen. Den er informasjon foreldre har krav på
 * etter personvernforordningen artikkel 13, ikke en avtale de godtar — derfor
 * står den som lenke ved siden av vilkårsboksen i påmeldingen, uten egen
 * avkrysning.
 *
 * Vilkårene ligger på /vilkar og er noe annet: der avtaler vi pris, avmelding
 * og regler. Dette er en redegjørelse for hva vi gjør med opplysningene.
 */
const PersonvernPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#FAFAF9] text-slate-900 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Personvernerklæring | Idrettsbarna</title>
                <meta name="description" content="Slik behandler Idrettsbarna personopplysninger om barn og foresatte som melder seg på svømmekurs." />
            </Helmet>

            <div className="max-w-4xl w-full mx-auto relative">
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors font-medium border-b border-transparent hover:border-slate-900 pb-0.5 w-fit"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Tilbake til forsiden
                </button>

                <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl p-8 md:p-16 relative">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <Shield className="w-8 h-8 text-slate-400" />
                            </div>
                            <h1 className="text-3xl md:text-5xl font-serif text-slate-900 tracking-tight">
                                Personvernerklæring
                            </h1>
                        </div>

                        <p className="text-lg text-slate-600 leading-relaxed font-light mb-12">
                            Her står hvilke opplysninger vi samler inn når du melder barnet ditt
                            på kurs, hva vi bruker dem til, hvem som får se dem, og hvilke
                            rettigheter du har.
                        </p>

                        <div className="space-y-12 text-slate-600 leading-relaxed font-light">

                            <section className="bg-slate-50/50 p-8 rounded-2xl border border-slate-100">
                                <h2 className="text-xl font-serif text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="p-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
                                        <UserCheck className="w-4 h-4 text-slate-900" />
                                    </div>
                                    1. Hvem er ansvarlig
                                </h2>
                                <p className="mb-4 text-lg">
                                    Idrettsbarna Svøm og Foto AS er ansvarlig for opplysningene som
                                    behandles her.
                                </p>
                                <p className="mb-2">
                                    Organisasjonsnummer: 921 985 630<br />
                                    Spørsmål om personvern: <a href="mailto:even@idrettsbarna.no" className="text-slate-900 underline hover:no-underline font-medium">even@idrettsbarna.no</a>
                                </p>
                                <p>
                                    Arrangerer et idrettslag kurset, er det idrettslaget som er
                                    ansvarlig for sine deltakere. Vi behandler da opplysningene på
                                    deres vegne, etter avtale med klubben.
                                </p>
                            </section>

                            <section className="p-4">
                                <h2 className="text-xl font-serif text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="p-1.5 bg-slate-100 rounded-full border border-slate-200">
                                        <Database className="w-4 h-4 text-slate-700" />
                                    </div>
                                    2. Hvilke opplysninger vi behandler
                                </h2>
                                <ul className="space-y-3 list-disc pl-5">
                                    <li><span className="text-slate-900 font-medium">Om barnet:</span> navn, fødselsdato, hvilke kurs det er påmeldt, oppmøte på kursdagene, og eventuelle notater fra instruktør om framgang eller praktiske forhold.</li>
                                    <li><span className="text-slate-900 font-medium">Om deg som foresatt:</span> navn, e-postadresse, telefonnummer, og postadresse når det trengs til fakturering.</li>
                                    <li><span className="text-slate-900 font-medium">Om betaling:</span> fakturaer, beløp, forfall og betalingsstatus.</li>
                                    <li><span className="text-slate-900 font-medium">Bilder av barnet:</span> undervannsbilder og andre bilder vi tar på kurs, og bilder fra livredningsprøver. De knyttes til ditt barn og er bare synlige for deg og for oss. Noen av dem kan du kjøpe.</li>
                                    <li><span className="text-slate-900 font-medium">Bilder vi bruker på nettsiden:</span> et fåtall bilder bruker vi til å vise hva vi driver med. Dem bruker vi bare når vi har fått tillatelse, og vi spør særskilt om det.</li>
                                    <li><span className="text-slate-900 font-medium">Ved innlogging:</span> e-postadresse og et kryptert passord.</li>
                                </ul>
                                <p className="mt-6">
                                    <span className="text-slate-900 font-medium">Vi lagrer ikke fødselsnummer</span>, og vi har ingen
                                    egne felter for helseopplysninger. Skriver du helseopplysninger i
                                    et fritekstfelt, behandles de som resten — men vi ber deg heller
                                    ta det direkte med instruktøren.
                                </p>
                            </section>

                            <hr className="border-slate-100" />

                            <section className="p-4">
                                <h2 className="text-xl font-serif text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="p-1.5 bg-slate-100 rounded-full border border-slate-200">
                                        <Shield className="w-4 h-4 text-slate-700" />
                                    </div>
                                    3. Hva vi bruker dem til
                                </h2>
                                <p className="mb-4">
                                    Vi behandler opplysningene for å kunne gi barnet ditt en plass og
                                    gjennomføre kurset: ta imot påmeldingen, føre oppmøte, sende
                                    bekreftelser og praktisk informasjon, og fakturere kursavgiften.
                                    Grunnlaget er avtalen vi har med deg, og for regnskapsbilag
                                    følger vi bokføringsloven.
                                </p>
                                <p>
                                    Krever kurset medlemskap i et idrettslag, kontrollerer vi det.
                                    Vi bruker ikke opplysningene til markedsføring uten at du har
                                    sagt ja, og vi selger dem aldri videre.
                                </p>
                            </section>

                            <hr className="border-slate-100" />

                            <section className="p-4">
                                <h2 className="text-xl font-serif text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="p-1.5 bg-slate-100 rounded-full border border-slate-200">
                                        <Globe className="w-4 h-4 text-slate-700" />
                                    </div>
                                    4. Hvem som får tilgang
                                </h2>
                                <p className="mb-4">
                                    Vi bruker noen leverandører for å få løsningen til å virke. De
                                    behandler opplysninger på våre vegne, etter avtale, og kan ikke
                                    bruke dem til noe annet.
                                </p>
                                <ul className="space-y-3 list-disc pl-5">
                                    <li><span className="text-slate-900 font-medium">Supabase</span> — database, innlogging og fillagring. Ligger i Irland (EU).</li>
                                    <li><span className="text-slate-900 font-medium">Resend</span> — sender e-postene våre. Mottar din e-postadresse, ditt og barnets navn, kursnavn og oppstartsdato. Lagrer i USA.</li>
                                    <li><span className="text-slate-900 font-medium">PowerOffice Go</span> — fakturering. Navn, adresse, e-post, telefon og fakturalinjer. Ligger i Norge.</li>
                                    <li><span className="text-slate-900 font-medium">Vercel</span> — serverer nettsidene. Behandler ingen personopplysninger, men driftslogger kan inneholde IP-adresse.</li>
                                </ul>
                                <p className="mt-6">
                                    Vi bruker ingen sporingsverktøy, ingen analyseverktøy og ingen
                                    tredjepartspiksler.
                                </p>
                            </section>

                            <section className="bg-slate-50/50 p-8 rounded-2xl border border-slate-100">
                                <h2 className="text-xl font-serif text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="p-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
                                        <Globe className="w-4 h-4 text-slate-900" />
                                    </div>
                                    5. Opplysninger som sendes ut av EØS
                                </h2>
                                <p className="mb-4 text-lg">
                                    Resend, som sender e-postene våre, lagrer i USA.
                                </p>
                                <p className="mb-4">
                                    Det gjelder innholdet i e-posten — barnets navn, ditt navn,
                                    kursnavn og oppstartsdato — samt leveringslogger. Opplysningene
                                    slettes hos dem etter 30 dager. Grunnlaget for overføringen er
                                    EUs standardkontrakter (SCC) og EU-U.S. Data Privacy Framework.
                                </p>
                                <p className="mb-4">
                                    Vi registrerer også når en e-post fra oss blir åpnet, og da
                                    lagres IP-adressen til den som åpnet den. Vi bruker det for å se
                                    om viktig informasjon har nådd fram. Vil du slippe dette, si fra,
                                    så merker vi kontoen din.
                                </p>
                                <p>
                                    Alt annet — databasen, innloggingen og bildene — ligger innenfor
                                    EU/EØS.
                                </p>
                            </section>

                            <hr className="border-slate-100" />

                            <section className="p-4">
                                <h2 className="text-xl font-serif text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="p-1.5 bg-slate-100 rounded-full border border-slate-200">
                                        <Clock className="w-4 h-4 text-slate-700" />
                                    </div>
                                    6. Hvor lenge vi lagrer
                                </h2>
                                <p className="mb-4">
                                    Det som ligger i portalen er familiens egen historikk, og den
                                    blir værende så lenge du har en konto hos oss. Du ser selv hva
                                    som er lagret når du logger inn, og du kan når som helst be oss
                                    slette noe av det eller alt.
                                </p>
                                <ul className="space-y-3 list-disc pl-5">
                                    <li><span className="text-slate-900 font-medium">Påmeldinger, oppmøte og kurshistorikk:</span> så lenge du har konto. Dette er barnets svømmehistorie — hvilke kurs det har gått, og hvordan det har gått framover.</li>
                                    <li><span className="text-slate-900 font-medium">Bilder av barnet:</span> så lenge du har konto. De er bare synlige for deg, og kan kjøpes så lenge de ligger der.</li>
                                    <li><span className="text-slate-900 font-medium">Bilder vi bruker på nettsiden:</span> så lenge vi bruker dem. Trekker du tillatelsen tilbake, tar vi dem ned.</li>
                                    <li><span className="text-slate-900 font-medium">Fakturaer og regnskapsbilag:</span> 5 år. Det følger av bokføringsloven, og gjelder selv om du sletter kontoen.</li>
                                    <li><span className="text-slate-900 font-medium">E-post hos Resend:</span> 30 dager.</li>
                                </ul>
                                <p className="mt-6">
                                    <span className="text-slate-900 font-medium">Glemte kontoer:</span> har du ikke
                                    logget inn på tre år, sender vi deg en påminnelse. Hører vi ikke
                                    fra deg, sletter vi kontoen og det som ligger i den. Slik blir
                                    ingenting liggende hos oss bare fordi det ble glemt.
                                </p>
                            </section>

                            <hr className="border-slate-100" />

                            <section className="p-4">
                                <h2 className="text-xl font-serif text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="p-1.5 bg-slate-100 rounded-full border border-slate-200">
                                        <UserCheck className="w-4 h-4 text-slate-700" />
                                    </div>
                                    7. Dine rettigheter
                                </h2>
                                <p className="mb-4">Du har rett til å:</p>
                                <ul className="space-y-2 list-disc pl-5">
                                    <li>se hvilke opplysninger vi har om deg og barnet ditt</li>
                                    <li>få rettet opplysninger som er feil</li>
                                    <li>få slettet opplysninger vi ikke lenger har grunnlag for å beholde</li>
                                    <li>få utlevert opplysningene i et format du kan ta med deg</li>
                                    <li>protestere mot behandling du mener ikke er nødvendig</li>
                                    <li>trekke tilbake et samtykke du har gitt</li>
                                </ul>
                                <p className="mt-6">
                                    Ta kontakt på <a href="mailto:even@idrettsbarna.no" className="text-slate-900 underline hover:no-underline font-medium">even@idrettsbarna.no</a>, så svarer vi innen 30 dager.
                                </p>
                                <p className="mt-4">
                                    Mener du vi behandler opplysninger feil, kan du klage til{' '}
                                    <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer" className="text-slate-900 underline hover:no-underline font-medium">Datatilsynet</a>.
                                    Vi vil gjerne høre fra deg først, så vi får rettet opp.
                                </p>
                            </section>

                            <hr className="border-slate-100" />

                            <section className="p-4">
                                <h2 className="text-xl font-serif text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="p-1.5 bg-slate-100 rounded-full border border-slate-200">
                                        <Cookie className="w-4 h-4 text-slate-700" />
                                    </div>
                                    8. Informasjonskapsler
                                </h2>
                                <p>
                                    Vi bruker bare de informasjonskapslene som trengs for at
                                    innloggingen skal virke. Ingen til sporing eller markedsføring,
                                    og derfor ber vi deg heller ikke om samtykke til dem.
                                </p>
                            </section>

                        </div>

                        <div className="mt-16 pt-8 border-t border-slate-100 text-center">
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                                Sist oppdatert: 18. oktober 2026
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonvernPage;

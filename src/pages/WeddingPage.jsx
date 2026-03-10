// Wedding Page - Version 2.0 - Updated
import React, { useState, useEffect } from 'react';
import './WeddingPage.css';
import { Church, Wine, Calendar, Phone, Mail, Heart } from 'lucide-react';

const WeddingPage = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeFaq, setActiveFaq] = useState(null);
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);

  // Countdown Timer - do godziny 17:00 (ceremonia)
  useEffect(() => {
    const updateCountdown = () => {
      const weddingDate = new Date('2027-04-24T17:00:00');
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.wedding-section').forEach(section => {
      section.classList.add('fade-in');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Calendar integration
  const handleCalendarClick = (type) => {
    const eventDetails = {
      title: 'Ślub Kinga & Michał',
      description: 'Zapraszamy na nasz ślub!',
      location: 'Plac Konfederacji 55, 01-834 Warszawa',
      startDate: '20270424T170000',
      endDate: '20270425T050000'
    };

    if (type === 'google') {
      const googleUrl = new URL('https://calendar.google.com/calendar/render');
      googleUrl.searchParams.append('action', 'TEMPLATE');
      googleUrl.searchParams.append('text', eventDetails.title);
      googleUrl.searchParams.append('details', eventDetails.description);
      googleUrl.searchParams.append('location', eventDetails.location);
      googleUrl.searchParams.append('dates', `${eventDetails.startDate}/${eventDetails.endDate}`);
      window.open(googleUrl.toString(), '_blank');
    } else if (type === 'apple') {
      // Generate ICS file for Apple Calendar
      const icsContent = generateICS(eventDetails);
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'slub-kinga-michal.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setShowCalendarOptions(false);
  };

  const generateICS = (eventDetails) => {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Kinga & Michał//PL',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Ślub Kinga & Michał',
      'X-WR-TIMEZONE:Europe/Warsaw',
      'BEGIN:VTIMEZONE',
      'TZID:Europe/Warsaw',
      'BEGIN:STANDARD',
      'DTSTART:19701025T030000',
      'TZOFFSETFROM:+0200',
      'TZOFFSETTO:+0100',
      'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
      'END:STANDARD',
      'BEGIN:DAYLIGHT',
      'DTSTART:19700329T020000',
      'TZOFFSETFROM:+0100',
      'TZOFFSETTO:+0200',
      'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
      'END:DAYLIGHT',
      'END:VTIMEZONE',
      'BEGIN:VEVENT',
      `UID:${timestamp}@wedding-kinga-michal`,
      `DTSTAMP:${timestamp}`,
      `DTSTART;TZID=Europe/Warsaw:${eventDetails.startDate}`,
      `DTEND;TZID=Europe/Warsaw:${eventDetails.endDate}`,
      `SUMMARY:${eventDetails.title}`,
      `DESCRIPTION:${eventDetails.description}`,
      `LOCATION:${eventDetails.location}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'TRANSP:OPAQUE',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      'DESCRIPTION:Przypomnienie: Jutro ślub Kingi i Michała!',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ];
    return icsLines.join('\r\n');
  };

  const faqData = [
    {
      question: 'Czy ceremonia i wesele odbywają się w tym samym miejscu?',
      answer: 'Nie. Ceremonia ślubna odbędzie się w kościele, natomiast przyjęcie weselne w sali położonej na obrzeżach Warszawy. Dokładne adresy znajdziecie w zakładce Lokalizacja.'
    },
     {
      question: 'Czy będzie zapewniony transport między kościołem a salą?',
      answer: 'Nie organizujemy wspólnego transportu. Do sali można wygodnie dojechać samochodem lub skorzystać z usług przewozowych, takich jak Uber.'
    },   
     {
      question: 'Czy można przyjść z osobą towarzyszącą?',
      answer: 'Oczywiście – jeśli na zaproszeniu została wskazana osoba towarzysząca, będzie nam bardzo miło gościć Was razem.'
    }, 
     {
      question: 'Czy dzieci są zaproszone?',
      answer: 'Tak. Jeśli planujecie przyjechać z dziećmi, będą one mile widziane.'
    }, 
     {
      question: 'Czy będą poprawiny?',
      answer: 'Nie planujemy poprawin – chcemy w pełni nacieszyć się wspólnym świętowaniem tego jednego dnia.'
    }, 
     {
      question: 'Jakie prezenty sprawią nam największą radość?',
      answer: 'Najwygodniejszą formą prezentu będzie koperta. Jeśli jednak ktoś chciałby podarować również drobny upominek, z pewnością sprawi nam to dużą przyjemność.'
    }, 
     {
      question: 'Czy zapewniamy nocleg dla gości?',
      answer: 'Nie organizujemy noclegów, jednak w pobliżu sali weselnej znajduje się kilka hoteli, z których można skorzystać według własnych preferencji.'
    }, 
     {
      question: 'Czy można zgłosić dietę specjalną?',
      answer: 'Tak, oczywiście. Jeśli jesteście wegetarianami lub macie alergie pokarmowe, prosimy o informację podczas potwierdzania obecności – zadbamy o odpowiednie menu.'
    }, 
     {
      question: 'Do kiedy należy potwierdzić obecność?',
      answer: 'Będziemy bardzo wdzięczni za potwierdzenie przybycia do 1 marca 2027 roku. Można to zrobić telefonicznie lub mailowo – dane znajdziecie w zakładce Kontakt.'
    }, 
     {
      question: 'Czy na miejscu będzie parking?',
      answer: 'Tak. Parking będzie dostępny zarówno przy kościele, jak i przy sali weselnej.'
    }, 
     {
      question: 'Czy można robić zdjęcia podczas ceremonii?',
      answer: 'Podczas ceremonii w kościele prosimy o pozostawienie fotografowania naszemu fotografowi. Po zakończeniu ceremonii oraz podczas przyjęcia zachęcamy do robienia zdjęć i uwieczniania wspólnych chwil.'
    },  
  ];

  return (
    <div className="wedding-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text fade-in-up">
            <h1 className="hero-names">Kinga & Michał</h1>
            <p className="hero-subtitle">Zapraszamy na nasz ślub</p>
            <div className="hero-date">
              <span>24</span>
              <span className="dot">•</span>
              <span>04</span>
              <span className="dot">•</span>
              <span>2027</span>
            </div>
            <p className="hero-location">Warszawa</p>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Welcome Text */}
      <section className="wedding-section welcome">
        <div className="container">
          <div className="content-wrapper">
            <div className="decorative-line"></div>
            <p className="welcome-text">
              Z radością zapraszamy Was do wspólnego świętowania najważniejszego dnia w naszym życiu.
            </p>
            <div className="decorative-line"></div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="wedding-section countdown">
        <div className="container">
          <h2 className="section-title">Do naszego ślubu zostało</h2>
          <div className="countdown-wrapper">
            <div className="countdown-item">
              <div className="countdown-number">{countdown.days}</div>
              <div className="countdown-label">dni</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-number">{countdown.hours}</div>
              <div className="countdown-label">godziny</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-number">{countdown.minutes}</div>
              <div className="countdown-label">minuty</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-number">{countdown.seconds}</div>
              <div className="countdown-label">sekundy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="wedding-section timeline">
        <div className="container">
          <h2 className="section-title">Nasz dzień</h2>
          <div className="timeline-wrapper">
            {/* Łatwo dodawaj nowe wydarzenia - po prostu skopiuj timeline-item */}
            <div className="timeline-item">
              <div className="timeline-time">17:00</div>
              <div className="timeline-content">
                <div className="timeline-icon">
                  <Church size={32} strokeWidth={1.5} />
                </div>
                <h3>Ceremonia Ślubna</h3>
                <p>Parafia pw. św. Zygmunta<br />Warszawa Bielany</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">19:00</div>
              <div className="timeline-content">
                <div className="timeline-icon">
                  <Wine size={32} strokeWidth={1.5} />
                </div>
                <h3>Przyjęcie Weselne</h3>
                <p>Sala Weselna Ostoja<br />Warszawa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venues */}
      <section className="wedding-section venues">
        <div className="container">
          <h2 className="section-title">Jak do nas dojechać</h2>
          <div className="venues-grid">
            <div className="venue-card">
              <h3>Ceremonia Ślubna</h3>
              <div className="venue-info">
                <h4>Parafia pw. św. Zygmunta</h4>
                <p>Plac Konfederacji 55</p>
                <p>01-834 Warszawa</p>
              </div>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2441.0181010310275!2d20.94370857637261!3d52.27937335401735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecbccf7ca131d%3A0x8c8206ec22e7f892!2zS2_Fm2Npw7PFgiBSenltc2tva2F0b2xpY2tpIHB3LiDFm3cuIFp5Z211bnRh!5e0!3m2!1spl!2spl!4v1773127174924!5m2!1spl!2spl"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa - Ceremonia"
                ></iframe>
              </div>
              <a
                href="https://maps.app.goo.gl/WXoWZUWh7tDLzjoy7"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Nawiguj w Google Maps
              </a>
            </div>

            <div className="venue-card">
              <h3>Wesele</h3>
              <div className="venue-info">
                <h4>Sala Weselna Ostoja</h4>
                <p>Marmurowa 11</p>
                <p>03-053 Warszawa</p>
              </div>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.256688531455!2d20.940972776377794!3d52.365765447637614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ec81ef57fe173%3A0x973f96a8918f350f!2sSala%20weselna%20Ostoja!5e0!3m2!1spl!2spl!4v1773127312830!5m2!1spl!2spl"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa - Wesele"
                ></iframe>
              </div>
              <a
                href="https://maps.app.goo.gl/xE75TjZVjaR63TvY9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Nawiguj w Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Save the Date */}
      <section className="wedding-section save-date">
        <div className="container">
          <h2 className="section-title">Zapisz datę</h2>
          <div className="save-date-wrapper">
            <button
              className="btn btn-primary"
              onClick={() => setShowCalendarOptions(!showCalendarOptions)}
            >
              <Calendar size={20} strokeWidth={2} />
              <span>Dodaj do kalendarza</span>
            </button>
            {showCalendarOptions && (
              <div className="calendar-options show">
                <button onClick={() => handleCalendarClick('google')} className="calendar-option">
                  Google Calendar
                </button>
                <button onClick={() => handleCalendarClick('apple')} className="calendar-option">
                  Apple Calendar
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="wedding-section quote">
        <div className="container">
          <div className="quote-wrapper">
            <div className="decorative-line"></div>
            <blockquote>
              „A więc trwają wiara, nadzieja i miłość – z nich zaś największa jest miłość."
            </blockquote>
            <div className="decorative-line"></div>
            <div className="heart-decoration">
              <Heart size={32} strokeWidth={1.5} fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wedding-section faq">
        <div className="container">
          <h2 className="section-title">Często zadawane pytania</h2>
          <div className="faq-wrapper">
            {faqData.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  {item.question}
                  <span className="faq-toggle">+</span>
                </button>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="wedding-section contact">
        <div className="container">
          <h2 className="section-title">Kontakt</h2>
          <div className="contact-wrapper">
            <div className="decorative-line"></div>
            <p>W razie pytań prosimy o kontakt</p>
            <div className="contact-grid">
              <div className="contact-person">
                <h3>Kinga</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-icon">
                      <Phone size={20} strokeWidth={1.5} />
                    </span>
                    <span className="contact-text"><a href="tel:+48507562811">+48 507 562 811</a></span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">
                      <Mail size={20} strokeWidth={1.5} />
                    </span>
                    <span className="contact-text"><a href="mailto:kingawojcik5252@gmail.com">kingawojcik5252@gmail.com</a></span>
                  </div>
                </div>
              </div>
              <div className="contact-person">
                <h3>Michał</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-icon">
                      <Phone size={20} strokeWidth={1.5} />
                    </span>
                    <span className="contact-text"><a href="tel:+48511779350">+48 511 779 350</a></span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">
                      <Mail size={20} strokeWidth={1.5} />
                    </span>
                    <span className="contact-text"><a href="mailto:michalokozak@gmail.com">michalokozak@gmail.com</a></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="decorative-line"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-line"></div>
          <p className="footer-quote">
            Do zobaczenia!
          </p>
          <p className="footer-text">
            Kinga <Heart size={16} strokeWidth={2} fill="currentColor" className="footer-heart" /> Michał 2027
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WeddingPage;
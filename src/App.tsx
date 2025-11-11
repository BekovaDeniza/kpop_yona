import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

import trainerPhoto from './assets/photo_2024-07-08_02-01-22.jpg'

type ScheduleKey = 'weekdays' | 'weekend'

const scheduleData: Record<ScheduleKey, string[]> = {
  weekdays: [
    'Пн 18:00 — Группа новичков',
    'Вт 19:30 — Индивидуальные (по записи)',
    'Ср 18:30 — Командные тренировки',
    'Чт 20:00 — Группа middle',
    'Пт 19:00 — Съемка кавера',
  ],
  weekend: [
    'Сб 12:00 — Мастер-класс',
    'Сб 15:00 — Индивидуальные (по записи)',
    'Вс 13:00 — Группа open level',
  ],
}

const scheduleTabs: Array<{ id: ScheduleKey; label: string }> = [
  { id: 'weekdays', label: 'Будни' },
  { id: 'weekend', label: 'Выходные' },
]

const formatCards = [
  {
    title: 'Индивидуальные занятия',
    description: 'Персональный план, постановка каверов по просьбе, гибкое время.',
    price: 'от 2 700 ₽ / 60 мин',
  },
  {
    title: 'Групповые классы',
    description: 'Командная энергия, до 10 человек, разбор трендовых хореографий.',
    price: 'от 1 500 ₽ / 90 мин',
  },
  {
    title: 'Мастер-классы',
    description: 'Интенсивные разборы хитов и подготовка к съемкам или выступлениям.',
    price: 'от 2 200 ₽ / 120 мин',
  },
]

const programSteps = [
  {
    title: 'Разминка',
    description: 'Подготовка тела, растяжка, работа с дыханием и линиями рук.',
  },
  {
    title: 'Разбор движений',
    description: 'Пошаговый анализ элементов, разбор акцентов, фиксация позиций.',
  },
  {
    title: 'Изучение хореографии',
    description: 'Сбор связок, работа с музыкальными переходами, синхронизация.',
  },
  {
    title: 'Отработка и запись',
    description: 'Повтор с корректировкой, запись результата для анализа и мотивации.',
  },
]

const portfolioItems = [
  {
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'K-pop cover',
    caption: 'Blackpink — How You Like That (групповой класс)',
  },
  {
    src: 'https://www.youtube.com/embed/rInPvc_qVC4',
    title: 'K-pop rehearsal',
    caption: 'TXT — Sugar Rush Ride (репетиция кавер-команды)',
  },
  {
    src: 'https://www.youtube.com/embed/Pk9JmaxBJVS',
    title: 'K-pop class',
    caption: 'New Jeans — Super Shy (индивидуальная постановка)',
  },
]

const howCards = [
  {
    title: 'Локация',
    description:
      'Студия Dance Loft, Москва, ул. Покровка, 28. Светлый зал, зеркала, профессиональный пол и оборудование.',
    link: {
      label: 'Открыть на карте',
      href: 'https://yandex.ru/maps/-/CCUeeOgdTC',
    },
  },
  {
    title: 'Правила записи',
    description:
      'Предоплата 50% фиксирует место. Перенос возможен один раз за 24 часа до начала занятия.',
  },
  {
    title: 'Экспресс-звонок',
    description:
      'Не уверены, что выбрать? Оставьте заявку и я помогу подобрать программу под ваши цели.',
  },
]

const pricingCards = [
  {
    title: 'Разовое занятие',
    items: ['Индивидуальное — 2 700 ₽', 'Группа — 1 500 ₽', 'Мастер-класс — 2 200 ₽'],
  },
  {
    title: 'Абонементы',
    items: ['4 индивидуальных — 10 000 ₽', '8 групповых — 10 800 ₽'],
  },
  {
    title: 'Скидки',
    items: ['-10% для школьников', '-15% на первый мастер-класс', 'Приведи друга: 1 занятие в подарок'],
  },
]

const testimonials = [
  {
    quote:
      '«С нуля поставили кавер за три недели. Очень комфортно, всегда есть поддержка и мотивация».',
    author: '— Вика, 17 лет',
  },
  {
    quote:
      '«Групповые классы — лучшая часть недели. Мы выступили на фестивале и заняли 2 место!».',
    author: '— Даша, 21 год',
  },
  {
    quote: '«Студийная атмосфера в центре Москвы очень заряжает. Уже после пары занятий чувствую прогресс».',
    author: '— Марк, 19 лет',
  },
]

const navLinks = [
  { href: '#about', label: 'Преподаватель' },
  { href: '#formats', label: 'Форматы' },
  { href: '#schedule', label: 'Расписание' },
  { href: '#signup', label: 'Запись' },
]

const heroStats = ['5 лет преподавания в лучших студиях Москвы', '125+ довольных учеников', 'Опытный тренер по K-pop']

const trainerHighlights = [
  { number: 'SMASH', label: 'Участница кавер команды' },
  { number: 'с 2022', label: 'Преподавательский стаж' },
  { number: 'с 2015', label: 'Исполнительский стаж' },
]

const featureList = [
  'Состою в шоу-балете более 3-х лет: работала с Филиппом Киркоровым, Димой Биланом, Анной Калашниковой, Кети Топурией и др.',
  'Постоянная участница фестивалей: Asian Dragon Fest (Москва, Санкт-Петербург), IdolCon, K-DAY, LAM, CoverLand, Fire Champ, Open-Air, MDKM KPD, K-pop Cover Battle, DeepFest, Venom Fest и др.',
]

const socialLinks = [
  { href: 'https://t.me/kpop_school', label: 'Telegram' },
  { href: 'https://instagram.com/kpop_school', label: 'Instagram' },
  { href: 'https://www.youtube.com/@kpop_school', label: 'YouTube' },
]

const contactItems = [
  { label: 'Телефон:', value: '+7 (999) 123-45-67', href: 'tel:+79991234567' },
  { label: 'WhatsApp:', value: 'Написать', href: 'https://wa.me/79991234567' },
  { label: 'Telegram:', value: '@kpop_school', href: 'https://t.me/kpop_school' },
  { label: 'Instagram:', value: '/kpop_school', href: 'https://instagram.com/kpop_school' },
  { label: 'Адрес:', value: 'Москва, ул. Покровка, 28' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSchedule, setActiveSchedule] = useState<ScheduleKey>('weekdays')
  const [toastVisible, setToastVisible] = useState(false)

  useEffect(() => {
    if (!toastVisible) {
      return
    }

    const timer = window.setTimeout(() => setToastVisible(false), 4000)
    return () => window.clearTimeout(timer)
  }, [toastVisible])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setToastVisible(true)
    event.currentTarget.reset()
  }

  return (
    <>
      <header className="hero" id="top">
        <div className="hero__media" aria-hidden>
          <div className="hero__badge">K-pop School</div>
          <video
            className="hero__video"
            src="https://cdn.coverr.co/videos/coverr-dance-class-on-stage-0960/1080p.mp4"
            poster="https://images.unsplash.com/photo-1514516430032-7f40ed9860bc?q=80&w=1920&auto=format&fit=crop"
            autoPlay
            muted
            loop
            playsInline
          >
            Ваш браузер не поддерживает видео фон.
          </video>
        </div>
        <div className="container hero__content">
          <nav className="nav">
            <a className="logo" href="#top">
              Yona K-pop School
            </a>
            <button
              className="nav__toggle"
              aria-expanded={menuOpen}
              aria-controls="nav-menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              ☰
            </button>
            <ul id="nav-menu" className={`nav__menu ${menuOpen ? 'is-open' : ''}`}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setMenuOpen(false)
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hero__text">
            <h1>Индивидуальные и групповые занятия по K-pop в Москве</h1>
            <p>
              Научим любимым каверам, поставим уверенную хореографию и поддержим на каждом шаге. Подойдет для новичков и
              тех, кто хочет расти.
            </p>
            <div className="hero__cta">
              <a className="button button--primary" href="#signup">
                Записаться на урок
              </a>
              <a className="button button--ghost" href="#portfolio">
                Смотреть видео
              </a>
            </div>
            <ul className="trust-signals">
              {heroStats.map((stat) => (
                <li key={stat}>{stat}</li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <main>
        <section className="section about" id="about">
          <div className="container section__content">
            <div className="section__header">
              <span className="section__eyebrow">О преподавателе</span>
              <h2>Башмакова Алёна — тренер по направлению K-pop</h2>
            </div>
            <div className="about__grid">
              <div className="about__media">
                <img src={trainerPhoto} alt="Башмакова Алёна — тренер K-pop" loading="lazy" />
                <div className="about__stats">
                  {trainerHighlights.map((item) => (
                    <div key={item.label}>
                      <span className="stat__number">{item.number}</span>
                      <span className="stat__label">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="about__text">
                <p>
                  Привет! Я Башмакова Алёна, тренер по направлению K-pop. Преподаю с 2022 года, танцую с 2015-го и
                  каждый день помогаю ученикам уверенно чувствовать себя на сцене.
                </p>
                <ul className="feature-list">
                  {featureList.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <p>
                  На своих занятиях я создаю атмосферу, где каждый может раскрыть свой потенциал. Не переживайте, если
                  что-то не получается с первого раза: я рядом, чтобы поддержать вас на каждом шаге. Главное — искренность
                  в движении, а не идеал.
                </p>
                <div className="social-links">
                  {socialLinks.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section formats" id="formats">
          <div className="container section__content">
            <div className="section__header">
              <span className="section__eyebrow">Форматы</span>
              <h2>Выберите комфортный ритм обучения</h2>
            </div>
            <div className="card-grid">
              {formatCards.map((card) => (
                <article key={card.title} className="card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <div className="card__price">{card.price}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program">
          <div className="container section__content">
            <div className="section__header">
              <span className="section__eyebrow">Программа уроков</span>
              <h2>Каждый урок — полноценный шаг к сцене</h2>
            </div>
            <div className="timeline">
              {programSteps.map((step) => (
                <div key={step.title} className="timeline__item">
                  <span className="timeline__dot" aria-hidden />
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section portfolio" id="portfolio">
          <div className="container section__content">
            <div className="section__header">
              <span className="section__eyebrow">Видео</span>
              <h2>Смотрите, как мы создаем K-pop</h2>
            </div>
            <div className="portfolio__grid">
              {portfolioItems.map((item) => (
                <div key={item.src} className="portfolio__item">
                  <iframe src={item.src} title={item.title} loading="lazy" allowFullScreen />
                  <p>{item.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section how-it-works">
          <div className="container section__content">
            <div className="section__header">
              <span className="section__eyebrow">Как проходят занятия</span>
              <h2>Уютная студия в центре Москвы</h2>
            </div>
            <div className="how__grid">
              {howCards.map((card) => (
                <div key={card.title} className="how__card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  {card.link ? (
                    <a className="link-arrow" href={card.link.href} target="_blank" rel="noopener noreferrer">
                      {card.link.label}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section pricing" id="schedule">
          <div className="container section__content">
            <div className="section__header">
              <span className="section__eyebrow">Стоимость и расписание</span>
              <h2>Прозрачные цены и актуальные наборы</h2>
            </div>
            <div className="pricing__grid">
              {pricingCards.map((card) => (
                <div key={card.title} className="pricing__card">
                  <h3>{card.title}</h3>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="schedule">
              <div className="schedule__tabs" role="tablist" aria-label="Расписание занятий">
                {scheduleTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`schedule__tab button button--ghost ${tab.id === activeSchedule ? 'is-active' : ''}`}
                    data-day={tab.id}
                    role="tab"
                    aria-selected={tab.id === activeSchedule}
                    onClick={() => setActiveSchedule(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {scheduleTabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`schedule__panel ${activeSchedule === tab.id ? 'is-active' : ''}`}
                  data-panel={tab.id}
                  role="tabpanel"
                  hidden={activeSchedule !== tab.id}
                >
                  <ul>
                    {scheduleData[tab.id].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section testimonials">
          <div className="container section__content">
            <div className="section__header">
              <span className="section__eyebrow">Отзывы</span>
              <h2>Ученики делятся победами</h2>
            </div>
            <div className="testimonials__grid">
              {testimonials.map((testimonial) => (
                <article key={testimonial.author} className="testimonial">
                  <p>{testimonial.quote}</p>
                  <span>{testimonial.author}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section signup" id="signup">
          <div className="container section__content">
            <div className="section__header">
              <span className="section__eyebrow">Записаться</span>
              <h2>Оставьте заявку и получите консультацию</h2>
              <p>Заполните форму — мы свяжемся в течение дня и подберем удобное время занятия.</p>
            </div>
            <div className="signup__grid">
              <form className="signup__form" onSubmit={handleSubmit}>
                <label>
                  Имя
                  <input type="text" name="name" placeholder="Например, Анна" required />
                </label>
                <label>
                  Телефон или мессенджер
                  <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required />
                </label>
                <label>
                  Предпочтительный формат
                  <select name="format" required defaultValue="">
                    <option value="" disabled>
                      Выберите
                    </option>
                    <option value="individual">Индивидуальные</option>
                    <option value="group">Групповые</option>
                    <option value="masterclass">Мастер-класс</option>
                  </select>
                </label>
                <label>
                  Комментарий
                  <textarea name="message" rows={3} placeholder="Что бы вы хотели выучить?" />
                </label>
                <button type="submit" className="button button--primary">
                  Записаться
                </button>
                <p className="form-note">Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
              </form>
              <div className="signup__info">
                <h3>Контакты</h3>
                <ul className="contact-list">
                  {contactItems.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </li>
                  ))}
                </ul>
                <p className="contact-note">Принимаем заявки ежедневно c 10:00 до 22:00. Ответим в течение 2-3 часов.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__content">
          <a className="logo" href="#top">
            Yona K-pop School
          </a>
          <p>© 2025 Yona K-pop School. Все права защищены.</p>
          <a className="link-arrow" href="#top">
            Наверх
          </a>
        </div>
      </footer>

      <div className={`toast ${toastVisible ? 'is-visible' : ''}`} role="status" aria-live="polite" aria-atomic="true">
        <p>Спасибо! Мы свяжемся с вами в ближайшее время.</p>
      </div>
    </>
  )
}


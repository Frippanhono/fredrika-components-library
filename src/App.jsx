import { useState } from "react";
import { Button } from "@minilogg/buttons";
import {
  Card,
  CardTitle,
  CardMedia,
} from "@minilogg/cards";
import { ChildCard } from "@minilogg/child-card";
import { DepartmentOverviewCard } from "@minilogg/department-overview-card";
import { TeacherCard } from "@minilogg/teacher-card";
import { MessageCard, NoticeCard } from "@minilogg/message-card";
import { Dropdown } from "@minilogg/dropdowns";
import { Modal } from "@minilogg/modals";
import { Tabs } from "@minilogg/tabs";
import { ToastProvider, useToast } from "@minilogg/toasts";
import { Navbar } from "@minilogg/navbar";
import { Input, Textarea } from "@minilogg/inputs";
import { Badge } from "@minilogg/badges";
import { WeeklySchedule } from "@minilogg/weekly-schedule";
import { MealStatusSelector } from "@minilogg/meal-status-selector";
import "./App.css";

const AbsenceIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
    <line x1="18" y1="3" x2="18" y2="9" />
    <line x1="15" y1="6" x2="21" y2="6" />
  </svg>
);

const CheckInOutIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <polyline points="9 14 11 16 15 12" />
  </svg>
);

const ContactsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 18c1-2.5 3-4 5-4s4 1.5 5 4" />
    <line x1="2" y1="8" x2="4" y2="8" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="2" y1="16" x2="4" y2="16" />
  </svg>
);

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

const CLARA_AVATAR =
  "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23f1c27d%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2226%22%20r%3D%2212%22%20fill%3D%22%23ffd9a8%22%2F%3E%3Cpath%20d%3D%22M10%2064c2-12%2010-20%2022-20s20%208%2022%2020z%22%20fill%3D%22%23ffd9a8%22%2F%3E%3C%2Fsvg%3E";

// SVG-placeholder: höstlöv med gröna stövlar (för "Senaste inlägg"-kortet).
const FOREST_POST_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="bg" cx="50%" cy="40%" r="80%">
          <stop offset="0%" stop-color="#d97706"/>
          <stop offset="60%" stop-color="#92400e"/>
          <stop offset="100%" stop-color="#451a03"/>
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#bg)"/>
      <g fill="#f59e0b" opacity="0.85">
        <ellipse cx="30" cy="40" rx="22" ry="12" transform="rotate(-25 30 40)"/>
        <ellipse cx="170" cy="60" rx="20" ry="11" transform="rotate(20 170 60)"/>
        <ellipse cx="50" cy="170" rx="24" ry="13" transform="rotate(15 50 170)"/>
        <ellipse cx="160" cy="160" rx="22" ry="12" transform="rotate(-30 160 160)"/>
      </g>
      <g fill="#fbbf24" opacity="0.75">
        <ellipse cx="90" cy="30" rx="18" ry="10" transform="rotate(10 90 30)"/>
        <ellipse cx="20" cy="110" rx="20" ry="11" transform="rotate(-40 20 110)"/>
        <ellipse cx="180" cy="120" rx="18" ry="10" transform="rotate(30 180 120)"/>
      </g>
      <g transform="translate(70 80)">
        <path d="M5 10 Q5 0 15 0 L25 0 Q35 0 35 10 L35 60 Q35 75 25 75 L15 75 Q5 75 5 60 Z" fill="#365314"/>
        <path d="M40 10 Q40 0 50 0 L60 0 Q70 0 70 10 L70 60 Q70 75 60 75 L50 75 Q40 75 40 60 Z" fill="#365314"/>
        <ellipse cx="20" cy="78" rx="18" ry="6" fill="#1c1917"/>
        <ellipse cx="55" cy="78" rx="18" ry="6" fill="#1c1917"/>
      </g>
    </svg>`,
  );

// SVG-placeholder: penslar/färgklickar för andra exempelinlägget.
const PAINT_POST_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="200" fill="#fef3c7"/>
      <circle cx="55" cy="70" r="32" fill="#ef4444" opacity="0.85"/>
      <circle cx="140" cy="85" r="28" fill="#3b82f6" opacity="0.85"/>
      <circle cx="95" cy="140" r="34" fill="#10b981" opacity="0.85"/>
      <circle cx="160" cy="150" r="20" fill="#f59e0b" opacity="0.9"/>
      <circle cx="35" cy="150" r="18" fill="#8b5cf6" opacity="0.85"/>
    </svg>`,
  );

function Showcase() {
  const toast = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [section, setSection] = useState("/clara");
  const [name, setName] = useState("");

  const navLinks = [
    { label: "Anmäla frånvaro", href: "/absence", icon: <AbsenceIcon /> },
    { label: "Checka in/ut", href: "/checkin", icon: <CheckInOutIcon /> },
    {
      label: "Clara",
      href: "/clara",
      avatar: CLARA_AVATAR,
      featured: true,
    },
    { label: "Kontaktlista", href: "/contacts", icon: <ContactsIcon /> },
    { label: "Mer", href: "/more", icon: <MoreIcon /> },
  ];

  return (
    <div className="app">
      <main className="app__main">
        <header className="app__hero">
          <h1>MiniLogg Components Library</h1>
          <nav className="app__hero-toc" aria-label="Komponenter">
            <span className="app__hero-intro">
              En samling React-komponenter:
            </span>
            {[
              { href: "#navbar", label: "navbar", variant: "success" },
              { href: "#components", label: "buttons", variant: "info" },
              { href: "#meal-status", label: "meal-status-selector", variant: "success" },
              { href: "#badges", label: "badges", variant: "success" },
              { href: "#cards", label: "cards", variant: "info" },
              { href: "#department-overview", label: "department-overview-card", variant: "success" },
              { href: "#child-card", label: "child-card", variant: "success" },
              { href: "#teacher-card", label: "teacher-card", variant: "success" },
              { href: "#message-card", label: "message-card", variant: "success" },
              { href: "#dropdown-tabs", label: "dropdowns", variant: "info" },
              { href: "#dropdown-tabs", label: "tabs", variant: "info" },
              { href: "#weekly-schedule", label: "weekly-schedule", variant: "success" },
              { href: "#forms", label: "inputs", variant: "success" },
              { href: "#feedback", label: "modals", variant: "info" },
              { href: "#feedback", label: "toasts", variant: "info" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="app__hero-toc-link">
                <Badge variant={item.variant}>{item.label}</Badge>
              </a>
            ))}
          </nav>
        </header>

        <section id="navbar" className="section">
          <h2 className="section__title">Navbar</h2>
          <p className="section__hint">
            Navigeringsmeny som visas högst upp på sidan i desktop och fast
            längst ner i mobilvy. Stödjer ikoner, avatarer och en markerad
            aktiv länk.
          </p>

          <h3 className="section__subtitle">Desktopvy</h3>
          <Navbar
            links={navLinks}
            activeHref={section}
            onNavigate={(link) => {
              setSection(link.href);
              toast.info(
                `Öppnar ${typeof link.label === "string" ? link.label : "vy"}`,
              );
            }}
          />

          <h3 className="section__subtitle">Mobilvy</h3>
          <div className="phone-frame" aria-label="Förhandsvisning i mobilvy">
            <div className="phone-frame__notch" aria-hidden="true" />
            <div className="phone-frame__screen">
              <div className="phone-frame__content">
                <p className="phone-frame__placeholder">
                  Innehåll i appen visas här. Navigeringen är fast längst ner
                  så den alltid är inom tummens räckhåll.
                </p>
              </div>
              <div className="phone-frame__navbar">
                <Navbar
                  links={navLinks}
                  activeHref={section}
                  onNavigate={(link) => {
                    setSection(link.href);
                    toast.info(
                      `Öppnar ${typeof link.label === "string" ? link.label : "vy"}`,
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="components" className="section">
          <h2 className="section__title">Buttons</h2>
          <div className="row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="row">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <section id="meal-status" className="section">
          <h2 className="section__title">Meal Status Selector</h2>
          <p className="section__hint">
            Horisontell väljare för att rapportera hur en måltid gick. Stora
            touch-ytor, tydligt vald-state och stöd för tangentbord.
          </p>
          <div style={{ maxWidth: 520 }}>
            <MealStatusSelector
              defaultValue="bra"
              onChange={(v) => toast.info(`Måltid markerad som: ${v}`)}
            />
          </div>
        </section>

        <section id="badges" className="section">
          <h2 className="section__title">Badges</h2>
          <div className="row">
            <Badge>Neutral</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
        </section>

        <section id="cards" className="section">
          <h2 className="section__title">Cards</h2>
          <p className="section__hint">
            Generella kort som grupperar relaterat innehåll. Med modifieraren
            <code> fc-card--row </code>kan ett kort visa en bild till vänster
            och innehåll till höger – passar t.ex. för en "Senaste inlägg"-lista.
          </p>

          <h3 className="section__subtitle">Senaste inlägg</h3>
          <div className="stack-cards">
            <Card
              className="fc-card--row"
              onClick={() => toast.info("Öppnar inlägg")}
            >
              <CardMedia aria-hidden="true">
                <img src={FOREST_POST_IMAGE} alt="" />
              </CardMedia>
              <div className="fc-card__content">
                <CardTitle>
                  Utflykt till skogen – vad vi hittade bland löven!
                </CardTitle>
                <div className="fc-card__row-footer">
                  <span>23 april</span>
                  <a
                    href="#cards"
                    className="fc-card__read-more"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Läs mer
                  </a>
                </div>
              </div>
            </Card>

            <Card className="fc-card--row">
              <CardMedia aria-hidden="true">
                <img src={PAINT_POST_IMAGE} alt="" />
              </CardMedia>
              <div className="fc-card__content">
                <CardTitle>
                  Måleri på avdelningen – färgglada konstverk
                </CardTitle>
                <div className="fc-card__row-footer">
                  <span>18 april</span>
                  <a
                    href="#cards"
                    className="fc-card__read-more"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Läs mer
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="department-overview" className="section">
          <h2 className="section__title">DepartmentOverviewCard</h2>
          <p className="section__hint">
            Hero/header-kort som presenterar en avdelning med namn, antal
            inskrivna barn, antal pedagoger och aktuellt tema.
          </p>
          <DepartmentOverviewCard
            name="Snäckan"
            childrenCount={16}
            teachersCount={3}
            theme="Färger och former"
          />
        </section>

        <section id="child-card" className="section">
          <h2 className="section__title">ChildCard</h2>
          <p className="section__hint">
            Pedagogiskt kort för att presentera ett barn med namn, avdelning,
            status och avatar.
          </p>
          <div className="stack-cards">
            <ChildCard
              name="Alma Andersson"
              department="Solrosen"
              status="present"
              guardians={["Anja Andersson", "Per Andersson"]}
              onClick={() => toast.info("Öppnar Alma")}
            />
            <ChildCard
              name="Adam Persson"
              department="Solrosen"
              status="present"
              guardians={["Anja Persson", "Peter Persson"]}
            />
            <ChildCard
              name="Cleo Cederlund"
              department="Maskrosen"
              status="leave"
              guardians={["Sara Cederlund"]}
            />
            <ChildCard
              name="Doris Dahl"
              department="Smörblomman"
              status={{ label: "Hämtas 14:30", tone: "info" }}
              guardians={["Mikael Dahl", "Lisa Dahl"]}
            />
          </div>
        </section>

        <section id="teacher-card" className="section">
          <h2 className="section__title">TeacherCard</h2>
          <p className="section__hint">
            Kort för personal på en avdelning – visar titel, namn och
            avdelning.
          </p>
          <h3 className="section__subtitle">Personal på avdelningen</h3>
          <div className="row-cards">
            <TeacherCard
              name="Anja Jansson"
              title="forskollarare"
              department="Solrosen"
              onClick={() => toast.info("Öppnar Anja")}
            />
            <TeacherCard
              name="Tove Karlsson"
              title="forskollarare"
              department="Solrosen"
            />
            <TeacherCard
              name="Lena Johansson"
              title="barnskotare"
              department="Solrosen"
            />
            <TeacherCard
              name="Sven Sköld"
              title={{ label: "Vikarie v.24", tone: "warning" }}
              department="Maskrosen"
            />
          </div>
        </section>

        <section id="message-card" className="section">
          <h2 className="section__title">MessageCard / NoticeCard</h2>
          <p className="section__hint">
            Kort för information mellan pedagog och vårdnadshavare – t.ex.
            meddelanden, anslag och aviseringar.
          </p>
          <div className="stack-cards">
            <MessageCard
              sender={{ name: "Anna Lärare", role: "teacher" }}
              recipient={{ name: "Per Persson", role: "guardian" }}
              subject="Utvecklingssamtal v.24"
              preview="Hej Per! Vill du boka tid för utvecklingssamtal nästa vecka? Jag har tider tisdag eftermiddag och torsdag förmiddag."
              timestamp="09:42"
              unread
              attachments={1}
              onClick={() => toast.info("Öppnar meddelande")}
              actions={
                <>
                  <Button size="sm" variant="secondary">
                    Markera läst
                  </Button>
                  <Button size="sm">Svara</Button>
                </>
              }
            />
            <MessageCard
              sender={{ name: "Lisa Dahl", role: "guardian" }}
              recipient={{ name: "Solrosen", role: "teacher" }}
              subject="Doris är sjuk idag"
              preview="Hej! Doris vaknade med feber så hon stannar hemma."
              timestamp="07:15"
            />
            <NoticeCard
              sender={{ name: "Förskolan Solrosen", role: "system" }}
              subject="Stängt fredag den 7 juni – planeringsdag"
              priority="high"
              timestamp={new Date()}
              attachments={2}
            >
              Förskolan håller stängt för planeringsdag. Behöver du barnomsorg
              kontakta kommunens jourförskola.
            </NoticeCard>
          </div>
        </section>

        <section id="dropdown-tabs" className="section">
          <h2 className="section__title">Dropdown & Tabs</h2>
          <div className="row">
            <Dropdown
              label="Choose action"
              items={[
                { label: "Edit", value: "edit" },
                { label: "Duplicate", value: "duplicate" },
                { label: "Archive", value: "archive" },
                { label: "Delete", value: "delete", disabled: true },
              ]}
              onSelect={(item) => toast.info(`Selected: ${item.label}`)}
            />
          </div>

          <Tabs
            tabs={[
              {
                label: "Översikt",
                icon: "🌼",
                content: (
                  <div className="dashboard">
                    <div className="dashboard__stats">
                      <div className="stat">
                        <span className="stat__label">Barn</span>
                        <span className="stat__value">24</span>
                        <Badge variant="info">3 avdelningar</Badge>
                      </div>
                      <div className="stat">
                        <span className="stat__label">Närvaro idag</span>
                        <span className="stat__value">21</span>
                        <Badge variant="success">88%</Badge>
                      </div>
                      <div className="stat">
                        <span className="stat__label">Aktiviteter</span>
                        <span className="stat__value">5</span>
                        <Badge variant="info">denna vecka</Badge>
                      </div>
                      <div className="stat">
                        <span className="stat__label">Olästa meddelanden</span>
                        <span className="stat__value">2</span>
                        <Badge variant="warning">från vårdnadshavare</Badge>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Dagens aktiviteter",
                icon: "🎨",
                content: (
                  <ul className="activity">
                    <li>
                      <Badge variant="info">08:30</Badge> Samling och morgonsång
                    </li>
                    <li>
                      <Badge variant="success">09:15</Badge> Utflykt till skogen
                      – tema "Höstens färger"
                    </li>
                    <li>
                      <Badge variant="info">11:30</Badge> Lunch och vila
                    </li>
                    <li>
                      <Badge variant="warning">14:00</Badge> Skapande verkstad –
                      kom ihåg förkläden
                    </li>
                  </ul>
                ),
              },
              {
                label: "Barngrupp",
                icon: "🧒",
                content: (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Namn</th>
                        <th>Avdelning</th>
                        <th>Närvaro</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Alma Andersson</td>
                        <td>Solrosen</td>
                        <td>
                          <Badge variant="success">På plats</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td>Bruno Berg</td>
                        <td>Solrosen</td>
                        <td>
                          <Badge variant="warning">Sjukanmäld</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td>Cleo Cederlund</td>
                        <td>Maskrosen</td>
                        <td>
                          <Badge variant="success">På plats</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td>Doris Dahl</td>
                        <td>Smörblomman</td>
                        <td>
                          <Badge variant="info">Ledig</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ),
              },
              {
                label: "Inställningar",
                icon: "⚙️",
                content: (
                  <div className="form-grid">
                    <Input
                      label="Förskola"
                      defaultValue="Lilla Ekens förskola"
                    />
                    <Input label="Kontakt" defaultValue="rektor@lillaeken.se" />
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section id="weekly-schedule" className="section">
          <h2 className="section__title">WeeklySchedule</h2>
          <p className="section__hint">
            Enkel veckovy med kort, tider och responsiv layout. Visar mån–fre
            som standard och staplar till en kolumn på smala skärmar.
          </p>
          <WeeklySchedule
            title="Vecka 19"
            events={[
              {
                day: "mon",
                start: "08:30",
                end: "09:15",
                title: "Samling & morgonsång",
                tone: "info",
              },
              {
                day: "mon",
                start: "11:30",
                end: "12:30",
                title: "Lunch och vila",
              },
              {
                day: "tue",
                start: "09:00",
                end: "11:00",
                title: "Utflykt – skogen",
                description: 'Tema "Höstens färger"',
                tone: "success",
              },
              {
                day: "wed",
                start: "10:00",
                end: "11:00",
                title: "Utevistelse på gården",
              },
              {
                day: "wed",
                start: "14:00",
                end: "15:30",
                title: "Skapande verkstad",
                description: "Kom ihåg förkläden",
                tone: "warning",
                onClick: () => toast.info("Öppnar Skapande verkstad"),
              },
              {
                day: "thu",
                start: "09:30",
                title: "Sångsamling",
                tone: "info",
              },
              {
                day: "fri",
                start: "13:00",
                end: "14:00",
                title: "Filmstund",
              },
            ]}
          />
        </section>

        <section id="forms" className="section">
          <h2 className="section__title">Inputs</h2>
          <div className="form-grid">
            <Input
              label="Name"
              placeholder="MiniLogg"
              hint="Visas i din profil"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={!name ? "Fyll först i namn ovan" : undefined}
            />
            <Textarea label="Message" placeholder="Skriv något..." />
          </div>
        </section>

        <section id="feedback" className="section">
          <h2 className="section__title">Modal & Toasts</h2>
          <div className="row">
            <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            <Button variant="secondary" onClick={() => toast.success("Saved!")}>
              Toast: success
            </Button>
            <Button
              variant="secondary"
              onClick={() => toast.warning("Heads up!")}
            >
              Toast: warning
            </Button>
            <Button
              variant="danger"
              onClick={() => toast.error("Something failed")}
            >
              Toast: error
            </Button>
          </div>
        </section>
      </main>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Bekräfta åtgärd"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Avbryt
            </Button>
            <Button
              onClick={() => {
                setModalOpen(false);
                toast.success("Bekräftad!");
              }}
            >
              Bekräfta
            </Button>
          </>
        }
      >
        <p>Är du säker på att du vill fortsätta? Detta är bara ett demo.</p>
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider position="top-right">
      <Showcase />
    </ToastProvider>
  );
}

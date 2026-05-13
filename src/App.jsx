import { useState } from "react";
import { Button } from "@minilogg/buttons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  ChildCard,
  MessageCard,
  NoticeCard,
} from "@minilogg/cards";
import { Dropdown } from "@minilogg/dropdowns";
import { Modal } from "@minilogg/modals";
import { Tabs } from "@minilogg/tabs";
import { ToastProvider, useToast } from "@minilogg/toasts";
import { Navbar } from "@minilogg/navbar";
import { Input, Textarea } from "@minilogg/inputs";
import { Badge } from "@minilogg/badges";
import { WeeklySchedule } from "@minilogg/weekly-schedule";
import "./App.css";

const AbsenceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
    <line x1="18" y1="3" x2="18" y2="9" />
    <line x1="15" y1="6" x2="21" y2="6" />
  </svg>
);

const CheckInOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <polyline points="9 14 11 16 15 12" />
  </svg>
);

const ContactsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      <Navbar
        brand="MiniLogg UI"
        links={navLinks}
        activeHref={section}
        onNavigate={(link) => {
          setSection(link.href);
          toast.info(`Öppnar ${typeof link.label === "string" ? link.label : "vy"}`);
        }}
        actions={
          <Button
            size="sm"
            variant="primary"
            onClick={() => toast.success("Hej!")}
          >
            Get started
          </Button>
        }
      />

      <main className="app__main">
        <header className="app__hero">
          <h1>MiniLogg Components Library</h1>
          <p>
            En samling React-komponenter: <Badge variant="info">buttons</Badge>{" "}
            <Badge variant="info">cards</Badge>{" "}
            <Badge variant="info">dropdowns</Badge>{" "}
            <Badge variant="info">modals</Badge>{" "}
            <Badge variant="info">tabs</Badge>{" "}
            <Badge variant="info">toasts</Badge>{" "}
            <Badge variant="success">navbar</Badge>{" "}
            <Badge variant="success">inputs</Badge>{" "}
            <Badge variant="success">badges</Badge>{" "}
            <Badge variant="success">weekly-schedule</Badge>
          </p>
        </header>

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

        <section className="section">
          <h2 className="section__title">Badges</h2>
          <div className="row">
            <Badge>Neutral</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
        </section>

        <section className="section">
          <h2 className="section__title">Cards</h2>
          <div className="grid-cards">
            <Card>
              <CardHeader>
                <CardTitle>Project Alpha</CardTitle>
              </CardHeader>
              <CardBody>
                Status och översikt för projekt Alpha. Lorem ipsum dolor sit
                amet.
              </CardBody>
              <CardFooter>
                <Button size="sm" variant="secondary">
                  Details
                </Button>
                <Button size="sm">Open</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Project Beta</CardTitle>
              </CardHeader>
              <CardBody>
                Andra korta beskrivningen av ett projekt. Använder samma stil.
              </CardBody>
              <CardFooter>
                <Button size="sm">Open</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Project Gamma</CardTitle>
              </CardHeader>
              <CardBody>Tredje kortet med samma struktur.</CardBody>
              <CardFooter>
                <Button size="sm">Open</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="section">
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

        <section className="section">
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
              Förskolan håller stängt för planeringsdag. Behöver du
              barnomsorg kontakta kommunens jourförskola.
            </NoticeCard>
          </div>
        </section>

        <section className="section">
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
                      <Badge variant="success">09:15</Badge> Utflykt till
                      skogen – tema "Höstens färger"
                    </li>
                    <li>
                      <Badge variant="info">11:30</Badge> Lunch och vila
                    </li>
                    <li>
                      <Badge variant="warning">14:00</Badge> Skapande verkstad
                      – kom ihåg förkläden
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
                    <Input label="Förskola" defaultValue="Lilla Ekens förskola" />
                    <Input
                      label="Kontakt"
                      defaultValue="rektor@lillaeken.se"
                    />
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="section">
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

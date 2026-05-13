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

function Showcase() {
  const toast = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [section, setSection] = useState("#components");
  const [name, setName] = useState("");

  const navLinks = [
    { label: "Components", href: "#components" },
    { label: "Forms", href: "#forms" },
    { label: "Feedback", href: "#feedback" },
  ];

  return (
    <div className="app">
      <Navbar
        brand="MiniLogg UI"
        links={navLinks}
        activeHref={section}
        onNavigate={(link) => setSection(link.href)}
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

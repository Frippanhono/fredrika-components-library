import { useState } from "react";
import { Button } from "@fredrika/buttons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
} from "@fredrika/cards";
import { Dropdown } from "@fredrika/dropdowns";
import { Modal } from "@fredrika/modals";
import { Tabs } from "@fredrika/tabs";
import { ToastProvider, useToast } from "@fredrika/toasts";
import { Navbar } from "@fredrika/navbar";
import { Input, Textarea } from "@fredrika/inputs";
import { Badge } from "@fredrika/badges";
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
        brand="Fredrika UI"
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
          <h1>Fredrika Components Library</h1>
          <p>
            En samling React-komponenter: <Badge variant="info">buttons</Badge>{" "}
            <Badge variant="info">cards</Badge>{" "}
            <Badge variant="info">dropdowns</Badge>{" "}
            <Badge variant="info">modals</Badge>{" "}
            <Badge variant="info">tabs</Badge>{" "}
            <Badge variant="info">toasts</Badge>{" "}
            <Badge variant="success">navbar</Badge>{" "}
            <Badge variant="success">inputs</Badge>{" "}
            <Badge variant="success">badges</Badge>
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
              { label: "Overview", content: <p>Översikt över systemet.</p> },
              {
                label: "Activity",
                content: <p>Här kommer din senaste aktivitet att visas.</p>,
              },
              { label: "Settings", content: <p>Inställningar för kontot.</p> },
            ]}
          />
        </section>

        <section id="forms" className="section">
          <h2 className="section__title">Inputs</h2>
          <div className="form-grid">
            <Input
              label="Name"
              placeholder="Fredrika"
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

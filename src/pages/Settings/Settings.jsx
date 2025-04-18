import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { IoMdSettings } from "react-icons/io";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('themeMode') === 'dark');

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode);
    document.body.classList.toggle('light', darkMode);
    localStorage.setItem('themeMode', darkMode ? 'light' : 'dark');
  };

  return (
    <Container className="settings-container">
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h2><IoMdSettings /> Paramètres</h2>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-30">
                  <Form.Label column sm="4">
                    Mode Sombre
                  </Form.Label>
                  <Col sm="8">
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Activer le mode sombre"
                      checked={darkMode}
                      onChange={handleThemeToggle}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Notifications
                  </Form.Label>
                  <Col sm="8">
                    <Form.Check
                      type="checkbox"
                      id="notifications"
                      label="Recevoir des notifications par email"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Langue
                  </Form.Label>
                  <Col sm="8">
                    <Form.Select aria-label="Choisir la langue">
                      <option>Français</option>
                      <option>Anglais</option>
                    
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Confidentialité
                  </Form.Label>
                  <Col sm="8">
                    <Form.Check
                      type="checkbox"
                      id="privacy"
                      label="Rendre mon profil public"
                    />
                  </Col>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Sauvegarder les modifications
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Settings;

import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import './Carousels.css';
import red from '../assets/images/red.png';
import blue from '../assets/images/blue.png';
import orange from '../assets/images/orange.png';

export const Carousels = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <section className='carouselpage' id="about">
    <h1>Why Auction Fantasy?</h1>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <Card className="carousel-card">
            <Card.Body className='first'>
              <Card.Title>First slide label</Card.Title>
              <Card.Text>
                Nulla vitae elit libero, a pharetra augue mollis interdum.
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card className="carousel-card">
            <Card.Body className='second'>
              <Card.Title>Second slide label</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card className="carousel-card">
            <Card.Body className='third'>
              <Card.Title>Third slide label</Card.Title>
              <Card.Text>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

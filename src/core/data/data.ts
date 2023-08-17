import image1 from '../../assets/images/image-1.webp';
import image2 from '../../assets/images/image-2.webp';
import image3 from '../../assets/images/image-3.webp';
import image4 from '../../assets/images/image-4.webp';
import image5 from '../../assets/images/image-5.webp';
import image6 from '../../assets/images/image-6.webp';
import about from '../../assets/images/about.webp';
import Contact from '../../assets/images/contact.webp';
import { type Data } from '../types/data.type.ts';

export const data: Data = {
  home: {
    title: 'ATRA',
    subtitle: 'Asistència Tècnica en Rehabilitació i Arquitectura',
    data: {
      name: 'Jaume Pérez Llopis',
      phone: '615 88 65 20',
      email: 'jaumeperezllopis@gmail.com',
      direction: 'c/ Els Dolors, 37 46500 Sagunt (Valencia) Spain'
    }
  },
  about: {
    mainImage: about,
    description: [
      "ATRA ofereix serveis integrals de disseny, planificació, gestió i contratació d'obres de reforma, rehabilitació i nova planta; de manera personal, directa i especialitzada.",
      "L'estudi individual detallat de cada idea o projecte, ens permet oferir una sol.lució única per a cada necessitat, lliure de complexos i de forma natural, dialogant continuament entre la economia i la plasticitat.",
      "Austeritat en els recursos i llibertat en la imaginació, son les eines que ens garantitzen l'èxit al solventar cadascuna de les noves oportunitats que ens ofereix l'obra arquitectònica."
    ]
  },
  contact: {
    mainImage: Contact,
    form: {
      name: 'NOM',
      surname: 'COGNOM',
      subject: 'ASUMPTE',
      email: 'EMAIL',
      content: 'MISSATGE'
    },
    button: 'Enviar e-mail'
  },
  projects: [
    {
      id: 'project-001',
      name: 'Rocafort',
      year: '2018',
      mainImage: image1,
      images: [image1, image1, image1, image1],
      top: true
    },
    {
      id: 'project-002',
      name: 'Proges 343',
      year: '2016',
      mainImage: image2,
      images: [image2, image2, image2, image2],
      top: true
    },
    {
      id: 'project-003',
      name: 'Baldoma',
      year: '2015',
      mainImage: image3,
      images: [image3, image3, image3, image3],
      top: true
    },
    {
      id: 'project-004',
      name: 'Sagunt',
      year: '2014',
      mainImage: image4,
      images: [image4, image4, image4, image4],
      top: true
    },
    {
      id: 'project-005',
      name: 'Albal',
      year: '2013',
      mainImage: image5,
      images: [image5, image5, image5, image5],
      top: true
    },
    {
      id: 'project-006',
      name: 'Quart de les valls',
      year: '2011',
      mainImage: image6,
      images: [image6, image6, image6, image6],
      top: true
    },
    {
      id: 'project-001',
      name: 'Rocafort',
      year: '2018',
      mainImage: image1,
      images: [image1, image1, image1, image1],
      top: false
    },
    {
      id: 'project-002',
      name: 'Proges 343',
      year: '2016',
      mainImage: image2,
      images: [image2, image2, image2, image2],
      top: false
    },
    {
      id: 'project-003',
      name: 'Baldoma',
      year: '2015',
      mainImage: image3,
      images: [image3, image3, image3, image3],
      top: false
    }
  ]
};

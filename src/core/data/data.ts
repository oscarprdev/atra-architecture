import image1 from "../../assets/images/image-1.webp";
import image2 from "../../assets/images/image-2.webp";
import image3 from "../../assets/images/image-3.webp";
import image4 from "../../assets/images/image-4.webp";
import image5 from "../../assets/images/image-5.webp";
import image6 from "../../assets/images/image-6.webp";
import { Data } from "../types/data.type.ts";

export const data: Data = {
  home: {
    title: "ATRA",
    subtitle: "Asistència Tècnica en Rehabilitació i Arquitectura",
    data: {
      name: "Jaume Perez Llopis",
      phone: "615 88 65 20",
      email: "jaumeperezllopis@gmail.com",
      direction: "c/ Els Dolors, 37 46500 Sagunt (Valencia) Spain",
    },
  },
  projects: [
    {
      id: "project-001",
      name: "Rocafort",
      year: "2018",
      mainImage: image1,
    },
    {
      id: "project-002",
      name: "Proges 343",
      year: "2016",
      mainImage: image2,
    },
    {
      id: "project-003",
      name: "Baldoma",
      year: "2015",
      mainImage: image3,
    },
    {
      id: "project-004",
      name: "Sagunt",
      year: "2014",
      mainImage: image4,
    },
    {
      id: "project-005",
      name: "Albal",
      year: "2013",
      mainImage: image5,
    },
    {
      id: "project-006",
      name: "Quart de les valls",
      year: "2011",
      mainImage: image6,
    },
    {
      id: "project-007",
      name: "Rocafort",
      year: "2018",
      mainImage: image1,
    },
    {
      id: "project-008",
      name: "Proges 343",
      year: "2016",
      mainImage: image2,
    },
    {
      id: "project-009",
      name: "Baldoma",
      year: "2015",
      mainImage: image3,
    },
  ],
};

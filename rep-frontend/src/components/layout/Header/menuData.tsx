import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Inicio",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Nosotros",
    path: "/about",
    newTab: false,
  },
  {
    id: 3,
    title: "Contacto",
    path: "/contact",
    newTab: false,
  },
  {
    id: 4,
    title: "Productos",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Copas y Trofeos",
        path: "/trophiesAndCups",
        newTab: false,
      },
      {
        id: 42,
        title: "Reconocimientos",
        path: "/recognitions",
        newTab: false,
      },
      {
        id: 43,
        title: "Promocionales y empresariales",
        path: "/promotional",
        newTab: false,
      },
      /*{
        id: 44,
        title: "Blog Sidebar Page",
        path: "/blog-sidebar",
        newTab: false,
      },
      {
        id: 45,
        title: "Blog Details Page",
        path: "/blog-details",
        newTab: false,
      },*/
      {
        id: 46,
        title: "Medallas",
        path: "/medals",
        newTab: false,
      },
      {
        id: 47,
        title: "Impresión Gran Formato ",
        path: "/impression",
        newTab: false,
      },
      /* {
        id: 48,
        title: "Error Page",
        path: "/error",
        newTab: false,
      },*/
    ],
  },
];
export default menuData;

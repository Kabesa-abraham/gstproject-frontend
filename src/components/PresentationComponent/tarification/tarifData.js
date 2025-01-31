import {FaCheck} from 'react-icons/fa'
import {HiX} from 'react-icons/hi'

export const tarification =[
    {
      plan: "Plan Gratuit",
      price: "0",
      list: [
        {
          icon: FaCheck,
          text: "3 projets actifs",
        },
        {
          icon: FaCheck,
          text: "5 membre max",
        },
        {
          icon: FaCheck,
          text: "Gestion des taches de base",
        },
        { icon:FaCheck,
          text: "Intégration Google Drive" 
        },
        { change: "color", icon: HiX, text: "Support prioritaire" },
      ],
    },
    {
      plan: "Plan Pro",
      price: "9.99",
      list: [
        {
          icon: FaCheck,
          text: "Projets illimités",
        },
        {
          icon: FaCheck,
          text: "jusqu'à 20 membre",
        },
        {
          icon: FaCheck,
          text: "Automatisations avancées",
        },
        {
          icon: FaCheck,
          text: "Mode hors ligne",
        },
        {
          icon: FaCheck,
          text: "Statistiques et rapports",
        },
        {
          icon: FaCheck,
          text: "Support prioritaire",
        },
        {
          change: "color",
          icon: HiX,
          text: "Personnalisation Avancé",
        },
      ],
    },
    {
      plan: "Plan Entreprise",
      price: "Sur demande",
      list: [
        {
          icon: FaCheck ,
          text: "Tout du plan Pro",
        },
        {
          icon: FaCheck,
          text: "Membres illimités",
        },
        {
          icon: FaCheck,
          text: "Personnalisation complète",
        },
        {
          icon: FaCheck,
          text: "Sécurité et chiffrement avancés",
        },
        {
          icon: FaCheck,
          text: "Intégration avec vos outils internes",
        },
        {
          icon: FaCheck,
          text: "Support VIP 24/7",
        },
      ],
    },
  ]
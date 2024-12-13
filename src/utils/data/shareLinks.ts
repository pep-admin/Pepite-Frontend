import whatsappLogo from '../icons/whatsappLogo.svg';
import telegramLogo from '../icons/telegramLogo.svg';
import instagramLogo from '../icons/instagramLogo.svg';
import facebookLogo from '../icons/facebookLogo.svg';

const message = "Rejoignez *Pépite* et partagez vos films et séries préférées avec vos amis !%0A%0A Découvrez notre site : http://localhost:3000";
const whatsappUrl = `https://wa.me/?text=${message}`;
const telegramUrl = `https://t.me/share/url?url=http://localhost:3000&text=${encodeURIComponent("Rejoignez Pépite et partagez vos films et séries préférées avec vos amis !")}`;
const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000`;

export const shareLinks = [
  {
    id: 0,
    name: 'WhatsApp',
    logo: whatsappLogo,
    url: whatsappUrl
  },
  {
    id: 1,
    name: 'Telegram',
    logo: telegramLogo,
    url: telegramUrl
  },
  {
    id: 2,
    name: 'Instagram',
    logo: instagramLogo,
    url: 'https://www.instagram.com'
  },
  {
    id: 3,
    name: 'Facebook',
    logo: facebookLogo,
    url: facebookUrl
  },
];

import { Button } from '@/components';

const NavButtons = ({ getStarted }) => {
  return (
    <a
      href='https://chromewebstore.google.com/detail/wawcd-chatgpt-powered-wha/gbbpfmmjcaakdmhlnjfdlhlehoeikbic'
      target='_blank'
    >
      <Button isPrimary={false} text={getStarted} background={true} />
    </a>
  );
};

export default NavButtons;

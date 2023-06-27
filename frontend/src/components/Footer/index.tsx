import "./styles.css";
import Logo from "../../assets/images/logo.png";
import GitHubT from "../../assets/icons/githubT.png";
import GitHubG from "../../assets/icons/githubG.png";

export default function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="footer-container">
        <div>
          <img src={Logo} alt="" className="footer-img" />
        </div>
        <div className="footer-github-img">
          <a href="https://github.com/GabrielSousaJS">
            <img src={GitHubG} alt="" width="30" />
          </a>
          <p className="footer-text">Gabriel de Sousa Santos</p>
          <a href="https://github.com/thaislzati">
            <img src={GitHubT} alt="" width="30" />
          </a>
          <p className="footer-text">Thaís Silva de Sousa</p>
        </div>
        <div>
          <p className="footer-text-final">
            Claraval Serviços de Varejo do Brasil Ltda.
          </p>
        </div>
        <p className="footer-address">
          Av. Getúlio Vargas, 2041, Torre E, 18° andar - Luziânia CEP: 72821-011{" "}
        </p>
      </div>
    </footer>
  );
}

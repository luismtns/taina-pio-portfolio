import PropTypes from "prop-types";
import { Col, Container, Row } from "react-grid-system";
import { useRouter } from "next/router";

import styles from "styles/About.module.scss";

import Layout from "components/layout";

const Home = ({ posts, pagination }) => {
  const { locale, locales, defaultLocale, asPath } = useRouter();
  const content = {
    "pt-BR": {
      about: (
        <>
          Tainá é designer, com foco em realizar propostas gráficas, impressas e
          digitais para identidades visuais, livros, sinalizações e sites para
          causas sociais, editoras, galerias, clientes da área de arquitetura,
          instituições culturais e educacionais formada pela Escola Britânica de
          Artes Criativas (EBAC) em 2020 e atualmente cursando design pelo
          Mackenzie, trabalhou como assistente para Julio Mariutti em Estúdio
          Lógos é trânsito, mistura, e só assim pode traduzir da linguagem,
          objetos, forma-conteúdo específica a cada projeto, e cliente contato
          em <a href="mailto:contato@tainapio.com">contato@tainapio.com</a>
        </>
      ),
    },
    "en-US": {
      about: (
        <>
          Tainá is a designer, focused on making graphic, printed and digital
          proposals for visual identities, books, signs and websites for social
          causes, publishers, galleries, clients in the area of ​​architecture,
          cultural and educational institutions formed by the British School of
          Creative Arts (EBAC ) in 2020 and currently studying design at
          Mackenzie, he worked as an assistant for Julio Mariutti at Estúdio
          Lógos é transit, mix, and only then could he translate language,
          objects, form-content specific to each project, and customer contact
          at <a href="mailto:contato@tainapio.com">contato@tainapio.com</a>
        </>
      ),
    },
  };
  return (
    <Layout>
      <div className={styles.container}>
        <Container fluid>
          <Row>
            <Col xs={12} lg={6}>
              <p>{content[locale] && content[locale]?.about}</p>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

Home.propTypes = {
  posts: PropTypes.array,
  pagination: PropTypes.object,
};
export default Home;

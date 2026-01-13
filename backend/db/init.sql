SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = 'utf8mb4_unicode_ci';

CREATE DATABASE IF NOT EXISTS booksdb
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE booksdb;

CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  published_at DATE,
  description TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

INSERT INTO books (title, author, published_at, description, image_url)
SELECT
  'Clean Code',
  'Robert C. Martin',
  '2008-08-01',
  'Clean Code é um guia completo para desenvolvedores que desejam escrever código limpo, legível e sustentável. O livro aborda os princípios fundamentais da programação, enfatizando a importância da clareza, simplicidade e manutenção. Robert C Martin, conhecido como Uncle Bob, apresenta exemplos práticos de como melhorar a estrutura do código, refatoração e boas práticas de design. O leitor aprende como evitar armadilhas comuns que levam a sistemas complexos e difíceis de manter. Além disso, o livro discute testes, documentação e padrões de nomenclatura que facilitam a colaboração em equipe. Cada capítulo apresenta casos reais e exercícios, incentivando a aplicação imediata dos conceitos. A obra é essencial tanto para programadores iniciantes quanto para profissionais experientes, proporcionando insights valiosos sobre disciplina, responsabilidade e ética no desenvolvimento de software. Com uma linguagem clara e direta, Clean Code torna-se referência mundial em engenharia de software, destacando-se pela abordagem prática e orientada à qualidade. A leitura deste livro ajuda a desenvolver hábitos sólidos de programação, reduzindo erros e aumentando a produtividade. O autor também explora a importância do feedback, revisão de código e integração contínua, mostrando como equipes podem trabalhar de forma mais eficiente. Além de conceitos técnicos, há reflexões sobre a mentalidade do programador e a importância de buscar a excelência em cada linha de código. Os exemplos incluem linguagens como Java, mas os princípios são universais e aplicáveis a qualquer linguagem. Ao final, o leitor estará preparado para escrever código que é fácil de entender, modificar e expandir, contribuindo para projetos mais robustos e confiáveis. Este livro é uma leitura indispensável para quem deseja elevar a qualidade do software e melhorar a carreira como desenvolvedor.',
  'https://images-na.ssl-images-amazon.com/images/I/41jEbK-jG+L._SX396_BO1,204,203,200_.jpg'
WHERE NOT EXISTS (
  SELECT 1 FROM books WHERE title = 'Clean Code'
);

INSERT INTO books (title, author, published_at, description, image_url)
SELECT
  'O Programador Pragmático',
  'Andrew Hunt & David Thomas',
  '1999-10-20',
  'O Programador Pragmático é uma obra clássica que aborda as melhores práticas e mentalidade para profissionais de desenvolvimento de software. Andrew Hunt e David Thomas compartilham conselhos práticos sobre como se tornar um programador eficaz, incluindo organização, testes, comunicação e aprendizado contínuo. O livro explora técnicas de design, refatoração e automação, além de apresentar princípios pragmáticos como DRY (Don’t Repeat Yourself) e a importância de escrever código que funcione hoje e seja adaptável para o futuro. Cada capítulo contém histórias e experiências do mundo real, ajudando o leitor a entender como aplicar os conceitos no dia a dia. O autor enfatiza a importância da responsabilidade pessoal, disciplina e pensamento crítico na carreira de programação. Além de habilidades técnicas, o livro discute carreira, ética profissional e desenvolvimento pessoal, mostrando como se tornar um programador completo. Com exemplos claros, exercícios e dicas de ferramentas, a obra incentiva a prática constante e a melhoria contínua. O leitor aprende a lidar com mudanças, otimizar processos e colaborar de forma eficiente com equipes. A narrativa é acessível, permitindo que iniciantes e profissionais experientes se beneficiem igualmente do conteúdo. O livro também aborda a cultura da programação, comunicação entre equipes e a importância de documentação adequada. Ao final, O Programador Pragmático prepara o leitor para enfrentar desafios reais de software, escrever código de qualidade e adotar hábitos que promovem produtividade, criatividade e aprendizado constante. É um guia essencial para quem deseja se destacar na profissão e construir soluções elegantes e robustas.',
  'https://images-na.ssl-images-amazon.com/images/I/51A8l+FxFNL._SX377_BO1,204,203,200_.jpg'
WHERE NOT EXISTS (
  SELECT 1 FROM books WHERE title = 'O Programador Pragmático'
);

INSERT INTO books (title, author, published_at, description, image_url)
SELECT
  'Zero to One',
  'Peter Thiel',
  '2014-09-16',
  'Zero to One é um livro sobre inovação e criação de valor, escrito por Peter Thiel, cofundador do PayPal. A obra ensina como construir empresas que criam coisas novas, em vez de competir em mercados já existentes. Thiel compartilha insights sobre pensamento original, tecnologia, empreendedorismo e estratégias para transformar ideias em negócios de sucesso. O leitor aprende a identificar oportunidades únicas, criar monopólios saudáveis e construir produtos que realmente importam. O livro discute a importância da visão de longo prazo, cultura empresarial, liderança e tomada de decisão. Com exemplos do mundo real, Thiel mostra como startups podem evitar erros comuns e alcançar crescimento exponencial. A obra também aborda questões de mercado, inovação incremental versus inovação radical, e como pensar de forma diferente para criar vantagem competitiva. Zero to One incentiva os leitores a desafiar suposições, questionar o status quo e buscar soluções que ninguém mais imaginou. O autor enfatiza que progresso verdadeiro não é copiar o que já existe, mas criar algo totalmente novo. A narrativa mistura teoria, prática e experiências pessoais, tornando o livro acessível e inspirador. É uma leitura essencial para empreendedores, investidores e profissionais que desejam transformar ideias em impacto real. Além disso, o livro oferece conselhos sobre recrutamento, cultura organizacional e como manter foco em objetivos estratégicos. Zero to One é mais do que um manual de negócios; é um guia de mentalidade para pensar grande, inovar e construir o futuro. A obra ensina que cada progresso começa com o pensamento original e coragem para realizar algo que ninguém mais fez, criando valor duradouro e significativo.',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794'
WHERE NOT EXISTS (
  SELECT 1 FROM books WHERE title = 'Zero to One'
);

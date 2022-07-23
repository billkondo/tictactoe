-- LOAD MODULE 
-- https://stackoverflow.com/questions/12505158/generating-a-uuid-in-postgres-for-insert-statement

-- Generate uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE loja
(
    store_id text PRIMARY KEY, -- usar nome transformado como id
    nome text NOT NULL UNIQUE,
    descricao text NOT NULL
);

CREATE TABLE moeda
(
    coin_id text PRIMARY KEY,
    nome text NOT NULL UNIQUE,
    classe_css text NOT NULL
);

CREATE TABLE item_categoria
(
    nome text PRIMARY KEY
);

CREATE TABLE item
(
    item_id text PRIMARY KEY, -- usar nome transformado como id
    nome text NOT NULL UNIQUE,
    descricao text NOT NULL,
    categoria text NOT NULL,
    FOREIGN KEY (categoria) REFERENCES item_categoria(nome) ON DELETE NO ACTION,
    valor integer NOT NULL CHECK (valor > 0),
    moeda_id text,
    FOREIGN KEY (moeda_id) REFERENCES moeda(coin_id) ON DELETE NO ACTION,
    moeda_nome text,
    moeda_classe_css text,
    url text
);

CREATE TABLE torneio
(
    tournament_id uuid PRIMARY KEY
);

CREATE TABLE partida
(
    match_id uuid PRIMARY KEY
);

CREATE TABLE comentario
(
    comment_id uuid PRIMARY KEY,
    data_de_envio timestamptz,
    texto text NOT NULL
);

CREATE TABLE transacao
(
    exchange_id uuid PRIMARY KEY,
    user_id uuid NOT NULL,
    data timestamptz NOT NULL,
    valor integer NOT NULL, -- valor pode ser negativo ou positivo
    tipo_da_moeda text NOT NULL
);

CREATE TABLE usuario
(
    user_id uuid PRIMARY KEY,
    nome text NOT NULL,
    username text UNIQUE NOT NULL,
    email text UNIQUE NOT NULL,
    data_de_cadastro timestamptz
);

CREATE TABLE carteira
(
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE NO ACTION,
    coin_id text,
    FOREIGN KEY (coin_id) REFERENCES moeda(coin_id) ON DELETE NO ACTION,
    PRIMARY KEY (user_id, coin_id),
    saldo integer NOT NULL CHECK (saldo >= 0)
);


CREATE TABLE mensagem
(
    message_id uuid PRIMARY KEY,
    texto text NOT NULL,
    data_de_envio timestamptz NOT NULL
);

CREATE TABLE grupo
(
    group_id uuid PRIMARY KEY,
    maximo_participantes integer NOT NULL CHECK (maximo_participantes >= 1),
    atual_participantes INTEGER
);

-- relacionamentos

CREATE TABLE anuncia
(
    store_id text,
    item_id text,
    FOREIGN KEY (store_id) REFERENCES loja(store_id) ON DELETE NO ACTION,
    FOREIGN KEY (item_id) REFERENCES item(item_id) ON DELETE NO ACTION,
    PRIMARY KEY(store_id, item_id),
    data_de_inicio timestamptz NOT NULL,
    data_de_termino timestamptz,
    valor_promocional integer CHECK (valor_promocional > 0)
);

CREATE TABLE adquire
(
    user_id uuid,
    item_id text,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (item_id) REFERENCES item(item_id) ON DELETE NO ACTION,
    PRIMARY KEY(user_id, item_id)
);

CREATE TABLE participa_torneio
(
    user_id uuid,
    tournament_id uuid,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (tournament_id) REFERENCES torneio(tournament_id) ON DELETE NO ACTION,
    PRIMARY KEY(user_id, tournament_id)
);

CREATE TABLE ganha
(
    user_id uuid,
    match_id uuid,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (match_id) REFERENCES partida(match_id) ON DELETE NO ACTION,
    PRIMARY KEY(user_id, match_id),
    moedas integer NOT NULL CHECK (moedas >= 0)
);

CREATE TABLE adiciona
(
    user_id uuid,
    -- cada comentário aparece na relação adiciona no máximo uma vez
    comment_id uuid UNIQUE,
    match_id uuid,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (comment_id) REFERENCES comentario(comment_id) ON DELETE NO ACTION,
    FOREIGN KEY (match_id) REFERENCES partida(match_id) ON DELETE NO ACTION,
    PRIMARY KEY(user_id, comment_id, match_id)
);

CREATE TABLE denuncia_comentario
(
    user_id uuid,
    comment_id uuid,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (comment_id) REFERENCES comentario(comment_id) ON DELETE NO ACTION,
    PRIMARY KEY(user_id, comment_id),
    motivo text NOT NULL,
    categoria text,
    FOREIGN KEY (categoria) REFERENCES item_categoria(nome) ON DELETE NO ACTION
);

CREATE TABLE denuncia_mensagem
(
    user_id uuid,
    message_id uuid,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (message_id) REFERENCES mensagem(message_id) ON DELETE NO ACTION,
    PRIMARY KEY(user_id, message_id),
    motivo text NOT NULL,
    categoria text,
    FOREIGN KEY (categoria) REFERENCES item_categoria(nome) ON DELETE NO ACTION
);

CREATE TABLE responde
(
    user_id uuid,
    comment_id uuid,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (comment_id) REFERENCES comentario(comment_id) ON DELETE NO ACTION,
    PRIMARY KEY(user_id, comment_id),
    comentario_respondido uuid,
    FOREIGN KEY (comentario_respondido) REFERENCES comentario(comment_id) ON DELETE NO ACTION
);

CREATE TABLE altera
(
    exchange_id uuid,
    user_id uuid,
    coin_id text,
    FOREIGN KEY (exchange_id) REFERENCES transacao(exchange_id) ON DELETE NO ACTION,
    FOREIGN KEY (user_id, coin_id) REFERENCES carteira(user_id, coin_id) ON DELETE NO ACTION,
    PRIMARY KEY(exchange_id, user_id, coin_id)
);

CREATE TABLE envia
(
    user_id uuid,
    message_id uuid,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (message_id) REFERENCES mensagem(message_id) ON DELETE NO ACTION,
    PRIMARY KEY(user_id, message_id),
    destinatario uuid,
    FOREIGN KEY (destinatario) REFERENCES usuario(user_id) ON DELETE NO ACTION
);

CREATE TABLE recebe
(
    user_id uuid,
    message_id uuid,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (message_id) REFERENCES mensagem(message_id) ON DELETE NO ACTION,
    PRIMARY KEY(user_id, message_id),
    remetente uuid,
    FOREIGN KEY (remetente) REFERENCES usuario(user_id) ON DELETE NO ACTION

);

CREATE TABLE reage
(
    user_id uuid,
    message_id uuid,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (message_id) REFERENCES mensagem(message_id) ON DELETE NO ACTION,
    PRIMARY KEY(user_id, message_id),
    icone text NOT NULL
);

CREATE TABLE cria
(
    user_id uuid,
    group_id uuid UNIQUE,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (group_id) REFERENCES grupo(group_id) ON DELETE NO ACTION,
    PRIMARY KEY(user_id, group_id),
    data_de_criacao timestamptz NOT NULL
);

CREATE TABLE participa_grupo
(
    user_id uuid,
    group_id uuid,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (group_id) REFERENCES grupo(group_id) ON DELETE NO ACTION,
    PRIMARY KEY(user_id, group_id),
    data_de_entrada timestamptz NOT NULL
);


-- gera convite?
CREATE TABLE convida
(
    user_id uuid,
    group_id uuid,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (group_id) REFERENCES grupo(group_id) ON DELETE NO ACTION,
    PRIMARY KEY(user_id, group_id),
    data_de_envio timestamptz NOT NULL,
    convite_aceito boolean
);

CREATE TABLE e_convidado
(
    user_id uuid,
    group_id uuid,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (group_id) REFERENCES grupo(group_id) ON DELETE NO ACTION,
    PRIMARY KEY(user_id, group_id),
    data_de_envio timestamptz NOT NULL,
    convite_aceito boolean
);


-- PROCEDURES

CREATE OR REPLACE FUNCTION GeraTransacaoPorItem ()
RETURNS TRIGGER AS $$
    DECLARE 
        preco INTEGER;
    BEGIN
        SELECT valor FROM item INTO preco WHERE item.item_id = NEW.item_id;
        INSERT INTO transacao VALUES (uuid_generate_v4 (), 
                               
                                      NEW.user_id, 
                                      CURRENT_TIMESTAMP, 
                                      preco, 
                                      '');
        RETURN NEW;
    END; 
$$ LANGUAGE plpgsql;

-- https://stackoverflow.com/questions/22733254/prevent-insert-if-condition-is-met
CREATE OR REPLACE FUNCTION InsereNoGrupo ()
RETURNS TRIGGER AS $$
    BEGIN
        IF ((SELECT atual_participantes  FROM grupo WHERE group_id = NEW.group_id) + 1 >
            (SELECT maximo_participantes FROM grupo WHERE group_id = NEW.group_id)) THEN
            RAISE EXCEPTION 'Número máximo de participantes atingido!';
        ELSE
            UPDATE grupo 
                SET atual_participantes = atual_participantes + 1
            WHERE grupo.group_id = NEW.group_id;
        END IF;
        RETURN NEW;

    END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION ChecaMaximoGrupo ()
RETURNS TRIGGER AS $$
    BEGIN
        IF ((SELECT atual_participantes  FROM grupo WHERE group_id = NEW.group_id)  >
             NEW.maximo_participantes) THEN
            RAISE EXCEPTION 'Número máximo de participantes não pode ser alterado!';
        END IF;
        RETURN NEW;

    END; 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE addTransaction(userID uuid, valor integer, moeda_id text)
LANGUAGE plpgsql
AS $$
BEGIN
INSERT INTO transacao (exchange_id, user_id, data, valor, tipo_da_moeda)
VALUES ( gen_random_uuid(), userID, CURRENT_TIMESTAMP, valor, moeda_id);


UPDATE carteira SET saldo = saldo - valor
WHERE carteira.user_id = userID AND carteira.coin_id = moeda_id;
IF NOT FOUND THEN
RAISE EXCEPTION 'Carteira not found';
END IF;
END;
$$;

-- TRIGGERS

-- CREATE TRIGGER AdquireGeraTransacao
-- AFTER INSERT ON adquire
-- FOR EACH ROW
-- WHEN ( NEW.user_id IS NOT NULL AND NEW.item_id IS NOT NULL)
--     EXECUTE PROCEDURE GeraTransacaoPorItem ();

-- CREATE TRIGGER NumeroMaximoGrupo 
-- BEFORE INSERT ON participa_grupo
-- FOR EACH ROW 
-- WHEN (NEW.group_id = g)
--     EXECUTE PROCEDURE InsereNoGrupo ();

-- CREATE TRIGGER AlteraMaximoGrupo 
-- BEFORE UPDATE ON grupo
-- FOR EACH ROW 
-- WHEN (NEW.maximo_participantes < OLD.maximo_participantes)
--     EXECUTE PROCEDURE ChecaMaximoGrupo ();
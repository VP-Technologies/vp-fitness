--
-- This file essentially contains all of the Schemas for our database
--

DROP DATABASE IF EXISTS vpfit;
CREATE DATABASE vpfit;

\c vpfit;

CREATE TABLE users (
  id SERIAL,
  username VARCHAR PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  active BOOLEAN default true,
  created TIMESTAMP without time zone default current_timestamp,
  password VARCHAR
);

CREATE TABLE userinfo (
  id SERIAL PRIMARY KEY,
  username VARCHAR REFERENCES users (username),
  age INTEGER,
  weight DECIMAL,
  height DECIMAL,
  goal_weight DECIMAL,
  goal INTEGER,
  difficulty INTEGER,
  equipment INTEGER[]
);

--
-- Name: oauth_tokens; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE oauth_tokens (
    id SERIAL NOT NULL,
    access_token text NOT NULL,
    access_token_expires_on timestamp without time zone NOT NULL,
    client_id text NOT NULL,
    user_id integer UNIQUE NOT NULL
);


--
-- Name: oauth_clients; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE oauth_clients (
    client_id text NOT NULL,
    client_secret text NOT NULL,
    redirect_uri text NOT NULL
);


--
-- Name: oauth_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY oauth_tokens
    ADD CONSTRAINT oauth_tokens_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (client_id, client_secret);
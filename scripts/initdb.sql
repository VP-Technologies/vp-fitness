--
-- This file essentially contains all of the Schemas for our database
__

DROP DATABASE IF EXISTS vpassistant;
CREATE DATABASE vpassistant;

\c vpassistant;

CREATE TABLE users (
  id SERIAL,
  username VARCHAR PRIMARY KEY,
  email VARCHAR,
  password VARCHAR
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
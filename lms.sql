SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

CREATE TABLE user_auth(
   id bigserial PRIMARY KEY NOT NULL,
   login text NOT NULL UNIQUE,
   email text NOT NULL UNIQUE,
   password text NOT NULL,
   is_admin boolean
);

CREATE TABLE public.course (
    id bigint NOT NULL,
    course_title character varying(255) NOT NULL,
    course_description character varying(255),
    course_price bigint,
    course_level character varying(255)
);


ALTER TABLE public.course OWNER TO lmsserver;

CREATE TABLE public.course_lessons (
    lessons_id bigint NOT NULL,
    courses_id bigint NOT NULL
);


ALTER TABLE public.course_lessons OWNER TO lmsserver;

CREATE TABLE public.discipline (
    id bigint NOT NULL,
    discipline_name character varying(255) NOT NULL,
    discipline_description character varying(255),
    discipline_price bigint
);


ALTER TABLE public.discipline OWNER TO lmsserver;


CREATE TABLE public.discipline_programs (
    programs_id bigint NOT NULL,
    disciplines_id bigint NOT NULL
);


ALTER TABLE public.discipline_programs OWNER TO lmsserver;

CREATE SEQUENCE public.hibernate_sequence
    START WITH 1000
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hibernate_sequence OWNER TO lmsserver;

CREATE TABLE public.lesson (
    id bigint NOT NULL,
    lesson_title character varying(255) NOT NULL,
    lesson_description character varying(255),
    language character varying(255)
);


ALTER TABLE public.lesson OWNER TO lmsserver;

CREATE TABLE public.program (
    id bigint NOT NULL,
    program_name character varying(255) NOT NULL,
    program_description character varying(255),
    program_price bigint
);


ALTER TABLE public.program OWNER TO lmsserver;

CREATE TABLE public.program_courses (
    courses_id bigint NOT NULL,
    programs_id bigint NOT NULL
);


ALTER TABLE public.program_courses OWNER TO lmsserver;


CREATE TABLE public.resource (
    id bigint NOT NULL,
    resource_name character varying(255),
    resource_description character varying(255),
    resource_url character varying(255),
    resource_preview_image character varying(255),
    resource_type character varying(255),
    weight integer,
    discipline_id bigint,
    program_id bigint,
    course_id bigint,
    lesson_id bigint
);


ALTER TABLE public.resource OWNER TO lmsserver;


ALTER TABLE ONLY public.course_lessons
    ADD CONSTRAINT course_lessons_pkey PRIMARY KEY (courses_id, lessons_id);


ALTER TABLE ONLY public.discipline_programs
    ADD CONSTRAINT discipline_programs_pkey PRIMARY KEY (disciplines_id, programs_id);


ALTER TABLE ONLY public.course
    ADD CONSTRAINT pk_course PRIMARY KEY (id);


ALTER TABLE ONLY public.databasechangeloglock
    ADD CONSTRAINT pk_databasechangeloglock PRIMARY KEY (id);


ALTER TABLE ONLY public.discipline
    ADD CONSTRAINT pk_discipline PRIMARY KEY (id);


ALTER TABLE ONLY public.lesson
    ADD CONSTRAINT pk_lesson PRIMARY KEY (id);


ALTER TABLE ONLY public.program
    ADD CONSTRAINT pk_program PRIMARY KEY (id);


ALTER TABLE ONLY public.resource
    ADD CONSTRAINT pk_resource PRIMARY KEY (id);


ALTER TABLE ONLY public.program_courses
    ADD CONSTRAINT program_courses_pkey PRIMARY KEY (programs_id, courses_id);


ALTER TABLE ONLY public.course_lessons
    ADD CONSTRAINT fk_course_lessons_courses_id FOREIGN KEY (courses_id) REFERENCES public.course(id);


ALTER TABLE ONLY public.course_lessons
    ADD CONSTRAINT fk_course_lessons_lessons_id FOREIGN KEY (lessons_id) REFERENCES public.lesson(id);


ALTER TABLE ONLY public.discipline_programs
    ADD CONSTRAINT fk_discipline_programs_disciplines_id FOREIGN KEY (disciplines_id) REFERENCES public.discipline(id);



ALTER TABLE ONLY public.discipline_programs
    ADD CONSTRAINT fk_discipline_programs_programs_id FOREIGN KEY (programs_id) REFERENCES public.program(id);


ALTER TABLE ONLY public.program_courses
    ADD CONSTRAINT fk_program_courses_courses_id FOREIGN KEY (courses_id) REFERENCES public.course(id);


ALTER TABLE ONLY public.program_courses
    ADD CONSTRAINT fk_program_courses_programs_id FOREIGN KEY (programs_id) REFERENCES public.program(id);


ALTER TABLE ONLY public.resource
    ADD CONSTRAINT fk_resource_course_id FOREIGN KEY (course_id) REFERENCES public.course(id);


ALTER TABLE ONLY public.resource
    ADD CONSTRAINT fk_resource_discipline_id FOREIGN KEY (discipline_id) REFERENCES public.discipline(id);


ALTER TABLE ONLY public.resource
    ADD CONSTRAINT fk_resource_lesson_id FOREIGN KEY (lesson_id) REFERENCES public.lesson(id);


ALTER TABLE ONLY public.resource
    ADD CONSTRAINT fk_resource_program_id FOREIGN KEY (program_id) REFERENCES public.program(id);

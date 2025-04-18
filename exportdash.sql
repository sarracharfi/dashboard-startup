PGDMP      *                }         	   dashboard    16.4    16.4 R    L           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            M           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            N           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            O           1262    215186 	   dashboard    DATABASE     |   CREATE DATABASE dashboard WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
    DROP DATABASE dashboard;
                postgres    false            �            1259    215213    domainactivity    TABLE     �   CREATE TABLE public.domainactivity (
    iddomain integer NOT NULL,
    aspect character varying(255) NOT NULL,
    name character varying(255) NOT NULL
);
 "   DROP TABLE public.domainactivity;
       public         heap    postgres    false            �            1259    215212    domainactivity_iddomain_seq    SEQUENCE     �   CREATE SEQUENCE public.domainactivity_iddomain_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.domainactivity_iddomain_seq;
       public          postgres    false    222            P           0    0    domainactivity_iddomain_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.domainactivity_iddomain_seq OWNED BY public.domainactivity.iddomain;
          public          postgres    false    221            �            1259    215264    dureestartup    TABLE     q   CREATE TABLE public.dureestartup (
    idduree integer NOT NULL,
    duration character varying(255) NOT NULL
);
     DROP TABLE public.dureestartup;
       public         heap    postgres    false            �            1259    215263    dureestartup_idduree_seq    SEQUENCE     �   CREATE SEQUENCE public.dureestartup_idduree_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.dureestartup_idduree_seq;
       public          postgres    false    236            Q           0    0    dureestartup_idduree_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.dureestartup_idduree_seq OWNED BY public.dureestartup.idduree;
          public          postgres    false    235            �            1259    215257    fundingmodel    TABLE     p   CREATE TABLE public.fundingmodel (
    idfunding integer NOT NULL,
    model character varying(255) NOT NULL
);
     DROP TABLE public.fundingmodel;
       public         heap    postgres    false            �            1259    215256    fundingmodel_idfunding_seq    SEQUENCE     �   CREATE SEQUENCE public.fundingmodel_idfunding_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.fundingmodel_idfunding_seq;
       public          postgres    false    234            R           0    0    fundingmodel_idfunding_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.fundingmodel_idfunding_seq OWNED BY public.fundingmodel.idfunding;
          public          postgres    false    233            �            1259    215206    genderfemale    TABLE     �   CREATE TABLE public.genderfemale (
    idfemale integer NOT NULL,
    annee integer NOT NULL,
    pourcentage numeric(5,2) NOT NULL
);
     DROP TABLE public.genderfemale;
       public         heap    postgres    false            �            1259    215205    genderfemale_idfemale_seq    SEQUENCE     �   CREATE SEQUENCE public.genderfemale_idfemale_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.genderfemale_idfemale_seq;
       public          postgres    false    220            S           0    0    genderfemale_idfemale_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.genderfemale_idfemale_seq OWNED BY public.genderfemale.idfemale;
          public          postgres    false    219            �            1259    215199 
   gendermale    TABLE     �   CREATE TABLE public.gendermale (
    idmale integer NOT NULL,
    annee integer NOT NULL,
    pourcentage numeric(5,2) NOT NULL
);
    DROP TABLE public.gendermale;
       public         heap    postgres    false            �            1259    215198    gendermale_idmale_seq    SEQUENCE     �   CREATE SEQUENCE public.gendermale_idmale_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.gendermale_idmale_seq;
       public          postgres    false    218            T           0    0    gendermale_idmale_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.gendermale_idmale_seq OWNED BY public.gendermale.idmale;
          public          postgres    false    217            �            1259    215222 
   innovation    TABLE     t   CREATE TABLE public.innovation (
    idinnovation integer NOT NULL,
    duration character varying(255) NOT NULL
);
    DROP TABLE public.innovation;
       public         heap    postgres    false            �            1259    215221    innovation_idinnovation_seq    SEQUENCE     �   CREATE SEQUENCE public.innovation_idinnovation_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.innovation_idinnovation_seq;
       public          postgres    false    224            U           0    0    innovation_idinnovation_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.innovation_idinnovation_seq OWNED BY public.innovation.idinnovation;
          public          postgres    false    223            �            1259    215236    label    TABLE     f   CREATE TABLE public.label (
    idlabel integer NOT NULL,
    name character varying(255) NOT NULL
);
    DROP TABLE public.label;
       public         heap    postgres    false            �            1259    215235    label_idlabel_seq    SEQUENCE     �   CREATE SEQUENCE public.label_idlabel_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.label_idlabel_seq;
       public          postgres    false    228            V           0    0    label_idlabel_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.label_idlabel_seq OWNED BY public.label.idlabel;
          public          postgres    false    227            �            1259    215229    maturite    TABLE     m   CREATE TABLE public.maturite (
    idmaturite integer NOT NULL,
    level character varying(255) NOT NULL
);
    DROP TABLE public.maturite;
       public         heap    postgres    false            �            1259    215228    maturite_idmaturite_seq    SEQUENCE     �   CREATE SEQUENCE public.maturite_idmaturite_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.maturite_idmaturite_seq;
       public          postgres    false    226            W           0    0    maturite_idmaturite_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.maturite_idmaturite_seq OWNED BY public.maturite.idmaturite;
          public          postgres    false    225            �            1259    215250 
   partmarche    TABLE     �   CREATE TABLE public.partmarche (
    idpartmarche integer NOT NULL,
    pourcentage numeric(5,2) NOT NULL,
    annee integer NOT NULL
);
    DROP TABLE public.partmarche;
       public         heap    postgres    false            �            1259    215249    partmarche_idpartmarche_seq    SEQUENCE     �   CREATE SEQUENCE public.partmarche_idpartmarche_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.partmarche_idpartmarche_seq;
       public          postgres    false    232            X           0    0    partmarche_idpartmarche_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.partmarche_idpartmarche_seq OWNED BY public.partmarche.idpartmarche;
          public          postgres    false    231            �            1259    215243    revenue    TABLE        CREATE TABLE public.revenue (
    idrevenue integer NOT NULL,
    amount numeric(15,2) NOT NULL,
    annee integer NOT NULL
);
    DROP TABLE public.revenue;
       public         heap    postgres    false            �            1259    215242    revenue_idrevenue_seq    SEQUENCE     �   CREATE SEQUENCE public.revenue_idrevenue_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.revenue_idrevenue_seq;
       public          postgres    false    230            Y           0    0    revenue_idrevenue_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.revenue_idrevenue_seq OWNED BY public.revenue.idrevenue;
          public          postgres    false    229            �            1259    215188    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255)
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    215187    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            Z           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            �           2604    215216    domainactivity iddomain    DEFAULT     �   ALTER TABLE ONLY public.domainactivity ALTER COLUMN iddomain SET DEFAULT nextval('public.domainactivity_iddomain_seq'::regclass);
 F   ALTER TABLE public.domainactivity ALTER COLUMN iddomain DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    215267    dureestartup idduree    DEFAULT     |   ALTER TABLE ONLY public.dureestartup ALTER COLUMN idduree SET DEFAULT nextval('public.dureestartup_idduree_seq'::regclass);
 C   ALTER TABLE public.dureestartup ALTER COLUMN idduree DROP DEFAULT;
       public          postgres    false    236    235    236            �           2604    215260    fundingmodel idfunding    DEFAULT     �   ALTER TABLE ONLY public.fundingmodel ALTER COLUMN idfunding SET DEFAULT nextval('public.fundingmodel_idfunding_seq'::regclass);
 E   ALTER TABLE public.fundingmodel ALTER COLUMN idfunding DROP DEFAULT;
       public          postgres    false    233    234    234            �           2604    215209    genderfemale idfemale    DEFAULT     ~   ALTER TABLE ONLY public.genderfemale ALTER COLUMN idfemale SET DEFAULT nextval('public.genderfemale_idfemale_seq'::regclass);
 D   ALTER TABLE public.genderfemale ALTER COLUMN idfemale DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    215202    gendermale idmale    DEFAULT     v   ALTER TABLE ONLY public.gendermale ALTER COLUMN idmale SET DEFAULT nextval('public.gendermale_idmale_seq'::regclass);
 @   ALTER TABLE public.gendermale ALTER COLUMN idmale DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    215225    innovation idinnovation    DEFAULT     �   ALTER TABLE ONLY public.innovation ALTER COLUMN idinnovation SET DEFAULT nextval('public.innovation_idinnovation_seq'::regclass);
 F   ALTER TABLE public.innovation ALTER COLUMN idinnovation DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    215239    label idlabel    DEFAULT     n   ALTER TABLE ONLY public.label ALTER COLUMN idlabel SET DEFAULT nextval('public.label_idlabel_seq'::regclass);
 <   ALTER TABLE public.label ALTER COLUMN idlabel DROP DEFAULT;
       public          postgres    false    228    227    228            �           2604    215232    maturite idmaturite    DEFAULT     z   ALTER TABLE ONLY public.maturite ALTER COLUMN idmaturite SET DEFAULT nextval('public.maturite_idmaturite_seq'::regclass);
 B   ALTER TABLE public.maturite ALTER COLUMN idmaturite DROP DEFAULT;
       public          postgres    false    226    225    226            �           2604    215253    partmarche idpartmarche    DEFAULT     �   ALTER TABLE ONLY public.partmarche ALTER COLUMN idpartmarche SET DEFAULT nextval('public.partmarche_idpartmarche_seq'::regclass);
 F   ALTER TABLE public.partmarche ALTER COLUMN idpartmarche DROP DEFAULT;
       public          postgres    false    232    231    232            �           2604    215246    revenue idrevenue    DEFAULT     v   ALTER TABLE ONLY public.revenue ALTER COLUMN idrevenue SET DEFAULT nextval('public.revenue_idrevenue_seq'::regclass);
 @   ALTER TABLE public.revenue ALTER COLUMN idrevenue DROP DEFAULT;
       public          postgres    false    230    229    230            �           2604    215191    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            ;          0    215213    domainactivity 
   TABLE DATA           @   COPY public.domainactivity (iddomain, aspect, name) FROM stdin;
    public          postgres    false    222   oY       I          0    215264    dureestartup 
   TABLE DATA           9   COPY public.dureestartup (idduree, duration) FROM stdin;
    public          postgres    false    236   �Z       G          0    215257    fundingmodel 
   TABLE DATA           8   COPY public.fundingmodel (idfunding, model) FROM stdin;
    public          postgres    false    234   �Z       9          0    215206    genderfemale 
   TABLE DATA           D   COPY public.genderfemale (idfemale, annee, pourcentage) FROM stdin;
    public          postgres    false    220   3[       7          0    215199 
   gendermale 
   TABLE DATA           @   COPY public.gendermale (idmale, annee, pourcentage) FROM stdin;
    public          postgres    false    218   r[       =          0    215222 
   innovation 
   TABLE DATA           <   COPY public.innovation (idinnovation, duration) FROM stdin;
    public          postgres    false    224   �[       A          0    215236    label 
   TABLE DATA           .   COPY public.label (idlabel, name) FROM stdin;
    public          postgres    false    228   �[       ?          0    215229    maturite 
   TABLE DATA           5   COPY public.maturite (idmaturite, level) FROM stdin;
    public          postgres    false    226   6\       E          0    215250 
   partmarche 
   TABLE DATA           F   COPY public.partmarche (idpartmarche, pourcentage, annee) FROM stdin;
    public          postgres    false    232   �\       C          0    215243    revenue 
   TABLE DATA           ;   COPY public.revenue (idrevenue, amount, annee) FROM stdin;
    public          postgres    false    230   �\       5          0    215188    users 
   TABLE DATA           :   COPY public.users (id, name, email, password) FROM stdin;
    public          postgres    false    216   ]       [           0    0    domainactivity_iddomain_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.domainactivity_iddomain_seq', 9, true);
          public          postgres    false    221            \           0    0    dureestartup_idduree_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.dureestartup_idduree_seq', 6, true);
          public          postgres    false    235            ]           0    0    fundingmodel_idfunding_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.fundingmodel_idfunding_seq', 4, true);
          public          postgres    false    233            ^           0    0    genderfemale_idfemale_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.genderfemale_idfemale_seq', 5, true);
          public          postgres    false    219            _           0    0    gendermale_idmale_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.gendermale_idmale_seq', 5, true);
          public          postgres    false    217            `           0    0    innovation_idinnovation_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.innovation_idinnovation_seq', 7, true);
          public          postgres    false    223            a           0    0    label_idlabel_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.label_idlabel_seq', 5, true);
          public          postgres    false    227            b           0    0    maturite_idmaturite_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.maturite_idmaturite_seq', 5, true);
          public          postgres    false    225            c           0    0    partmarche_idpartmarche_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.partmarche_idpartmarche_seq', 3, true);
          public          postgres    false    231            d           0    0    revenue_idrevenue_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.revenue_idrevenue_seq', 3, true);
          public          postgres    false    229            e           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 8, true);
          public          postgres    false    215            �           2606    215220 "   domainactivity domainactivity_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.domainactivity
    ADD CONSTRAINT domainactivity_pkey PRIMARY KEY (iddomain);
 L   ALTER TABLE ONLY public.domainactivity DROP CONSTRAINT domainactivity_pkey;
       public            postgres    false    222            �           2606    215269    dureestartup dureestartup_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.dureestartup
    ADD CONSTRAINT dureestartup_pkey PRIMARY KEY (idduree);
 H   ALTER TABLE ONLY public.dureestartup DROP CONSTRAINT dureestartup_pkey;
       public            postgres    false    236            �           2606    215262    fundingmodel fundingmodel_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.fundingmodel
    ADD CONSTRAINT fundingmodel_pkey PRIMARY KEY (idfunding);
 H   ALTER TABLE ONLY public.fundingmodel DROP CONSTRAINT fundingmodel_pkey;
       public            postgres    false    234            �           2606    215211    genderfemale genderfemale_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.genderfemale
    ADD CONSTRAINT genderfemale_pkey PRIMARY KEY (idfemale);
 H   ALTER TABLE ONLY public.genderfemale DROP CONSTRAINT genderfemale_pkey;
       public            postgres    false    220            �           2606    215204    gendermale gendermale_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.gendermale
    ADD CONSTRAINT gendermale_pkey PRIMARY KEY (idmale);
 D   ALTER TABLE ONLY public.gendermale DROP CONSTRAINT gendermale_pkey;
       public            postgres    false    218            �           2606    215227    innovation innovation_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.innovation
    ADD CONSTRAINT innovation_pkey PRIMARY KEY (idinnovation);
 D   ALTER TABLE ONLY public.innovation DROP CONSTRAINT innovation_pkey;
       public            postgres    false    224            �           2606    215241    label label_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.label
    ADD CONSTRAINT label_pkey PRIMARY KEY (idlabel);
 :   ALTER TABLE ONLY public.label DROP CONSTRAINT label_pkey;
       public            postgres    false    228            �           2606    215234    maturite maturite_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.maturite
    ADD CONSTRAINT maturite_pkey PRIMARY KEY (idmaturite);
 @   ALTER TABLE ONLY public.maturite DROP CONSTRAINT maturite_pkey;
       public            postgres    false    226            �           2606    215255    partmarche partmarche_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.partmarche
    ADD CONSTRAINT partmarche_pkey PRIMARY KEY (idpartmarche);
 D   ALTER TABLE ONLY public.partmarche DROP CONSTRAINT partmarche_pkey;
       public            postgres    false    232            �           2606    215248    revenue revenue_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.revenue
    ADD CONSTRAINT revenue_pkey PRIMARY KEY (idrevenue);
 >   ALTER TABLE ONLY public.revenue DROP CONSTRAINT revenue_pkey;
       public            postgres    false    230            �           2606    215197    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            �           2606    215195    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            ;     x�E�=n�0�g�ܚ ���o������2��IC�]�H>�/V*�M ����W�S�'h��u�1�8“�[��Ř��O��X89w��3�K��:�pC�%qp��aל��~�����g�z�G�EaL��H^&I�T�	�)�Vguu�uV�Byf��v�ac�"ٻaLP���E&�-��e,锥Y��u�ҕ���m�K7y̘��q#��ҵ��� ��`��7	�2�'�Tɱ�T^��Ŧ��Ѕ|),�Yc~���c      I   '   x�3�4�2�4�5�2�4�5�2�4�5�2������� D�3      G   g   x�3�Tp��K)VHI�2��k�r3sr2�󊹌a�<����KR�3j�L
L`
BJ�2�3S�@��{敥�d���(h��xj�!���qqq ��*&      9   /   x�3�4202�4�30�2�9�-ASǄ���1�p���b���� ���      7   2   x�%Ǳ 0�99
�c���7;B�h7�g#�lr�����i+��	�      =   #   x�3�4204�2Q�\� ʂ�Hr��qqq Vg�      A   ?   x�%���0�7*��egT��A�;wq��SӪ��<,�׹�Q��b�f�!��{� V�Z      ?   ]   x�3�,�H,NUHy�033���Ē��<+U.c�L�BA�ᕺ���E��'��Z)�r�p* t"ə��r���R���3���r@�=... ڿ(      E   %   x�3�42�30�4202�2�41�s�9M���=... �#�      C   *   x�3�42� = �Ȑˈ�EĈ˘���E̘+F��� F�
(      5   �   x�m�=
�0Fg�>����y+d�!�(�q6�����Ņz�	}Z�����"�M��tcڮF0�`�(���<kkmuT�@'p�a�^	��,(�t�͇*���A��XQN��(�\۴&}���']����
 N<�N�     
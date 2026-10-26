-- 유저
create table users (
    phone_num varchar(11) primary key not null, 
    name varchar(20) not null
);

-- 학력
create table education (
    id int auto_increment primary key not null,
    phone_num varchar(11) not null, 
    school_name varchar(15) default null,
    major varchar(20) default null,
    graduate boolean default null,
    
    foreign key (phone_num) references users(phone_num) on delete cascade
);

-- 경력
create table career (
    id int auto_increment primary key not null,
    phone_num varchar(11) not null,
    role varchar(30) default null,
    company_name varchar(40) default null,
    start_date timestamp default null,
    end_date timestamp default null,

    foreign key (phone_num) references users(phone_num) on delete cascade
);

-- 프로젝트
create table project (
    id int auto_increment primary key not null,
    phone_num varchar(11) not null,
    project_name varchar(50) default null,
    role varchar(30) default null,
    start_date timestamp default null,
    end_date timestamp default null,

    foreign key (phone_num) references users(phone_num) on delete cascade
) ;

-- 스킬
create table skill(
    id int auto_increment primary key not null,
    phone_num varchar(11) not null,
    skill json default null,

    foreign key (phone_num) references users(phone_num) on delete cascade
);

-- 질문방
create table chatroom (
    id int auto_increment primary key not null,
    phone_num varchar(30) not null,
    objective varchar(50) not null,
    create_at timestamp default current_timestamp not null,

    foreign key (phone_num) references users(phone_num) on delete cascade
);

-- 질문목록
create table question (
    id int auto_increment primary key not null,
    chatroom_id int not null,
    phone_num varchar(30) not null,
    question text not null,
    answer text default null,
    feedback JSON default null,
    create_at timestamp default current_timestamp not null,

    foreign key (phone_num) references users(phone_num) on delete cascade ,
    foreign key (chatroom_id) references chatroom(id) on delete cascade
);
export type trackType = {
    _id: number,
    name: string,
    author: string,
    release_date: string,
    genre: string[],
    duration_in_seconds: number,
    album: string,
    logo: null | string,
    track_file: string,
    stared_user: Array<userType>
}

export type userType = {
    _id: number,
    username: string,
    first_name: string;
    last_name: string;
    email: string;
}

export type SignInFormType = {
    email: string;
    password: string;
}

export type SignUpFormType = {
    email: string;
    password: string;
    username: string;
  };
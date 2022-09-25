export interface UserAuthValues {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
}

export interface UserAuth {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  is_active: boolean;
}

export interface UserListItem {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  last_login: string;
  is_superuser: boolean;
}

export interface UserEdit {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}

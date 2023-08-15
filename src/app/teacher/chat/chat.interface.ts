export interface connectionData {
  success?: true;
  _id?: string;
  connection: {
    student: {
      _id: string;
      image: string;
      name: string;
      class: {
        className: number;
        division: string;
      };
    };
    teacher: {
      _id: string;
      image: string;
    };
  };
}

export interface allChat {
  _id: string;
  content: string;
  date: string;
  from: string;
  to: string;
  connection?: {
    connection?: {
      student: {
        _id: string;
        image: string;
        name: string;
        class: {
          className: number;
          division: string;
        };
      };
      teacher: {
        _id: string;
        image: string;
      };
    };
  };
}

export interface studentData {
  _id: string;
  image: string;
  name: string;
  class: {
    className: number;
    division: string;
  };
}

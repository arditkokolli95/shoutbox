class Message {
  content: string;
  images: string;
  display_name: string;

  constructor(content: string, images: string, display_name: string) {
    this.content = content;
    this.images = images;
    this.display_name = display_name;
  }
};

export default Message;

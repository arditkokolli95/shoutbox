class Message {
  content: string;
  images: string;
  display_name: string;
  user_ip: string;
  user_agent: string;

  constructor(content: string, images: string, display_name: string, user_ip: string, user_agent: string) {
    this.content = content;
    this.images = images;
    this.display_name = display_name;
    this.user_ip = user_ip;
    this.user_agent = user_agent;
  }
};

export default Message;

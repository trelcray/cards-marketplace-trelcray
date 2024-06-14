interface ITitleProps {
  title: string;
}

export const Title: React.FC<ITitleProps> = ({ title }) => {
  return <h1 className="mt-14 text-2xl font-bold">{title}</h1>;
};

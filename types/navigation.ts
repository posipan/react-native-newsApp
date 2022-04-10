import { ArticleProps } from "./article";

export type RootStackParamList = {
  Home: undefined;
  Clip: undefined;
  Article: {article: ArticleProps};
};

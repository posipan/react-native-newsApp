import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { VFC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { RootStackParamList } from '../types/navigation';

type Props = {
  // navigation: StackNavigationProp<RootStackParamList, "Article">;
  route: RouteProp<RootStackParamList, "Article">;
};

export const ArticleScreen: VFC<Props> = ({ route }) => {
  const { article } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <WebView style={styles.container} source={{ uri: article.url }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

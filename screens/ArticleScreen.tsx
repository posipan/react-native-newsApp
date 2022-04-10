import { RouteProp } from '@react-navigation/native';
import { VFC } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { RootStackParamList } from '../types/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addClip, deleteClip } from '../store/actions/user';
import { State } from '../types/state';
import { User } from '../types/user';
import { ClipButton } from '../components/ClipButton';
import { Loading } from '../components/Loading';

type Props = {
  // navigation: StackNavigationProp<RootStackParamList, "Article">;
  route: RouteProp<RootStackParamList, 'Article'>;
};

export const ArticleScreen: VFC<Props> = ({ route }) => {
  const { article } = route.params;

  const dispatch = useDispatch();

  const user = useSelector((state: State) => state.user) as User;
  const { clips } = user;

  const isClipped = () => {
    return clips.some((clip) => clip.url === article.url);
  };

  const toggleClip = () => {
    if (isClipped()) {
      dispatch(deleteClip({ clip: article }));
    } else {
      dispatch(addClip({ clip: article }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ClipButton onPress={toggleClip} enabled={isClipped()} />
      <WebView
        source={{ uri: article.url }}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

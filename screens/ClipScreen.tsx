import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { VFC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ListItem from '../components/ListItem';
import { Article } from '../types/article';
import { RootStackParamList } from '../types/navigation';
import { State } from '../types/state';
import { User } from '../types/user';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Clip'>;
  route: RouteProp<RootStackParamList, 'Clip'>;
};

export const ClipScreen: VFC<Props> = ({ navigation, route }) => {
  const user = useSelector((state: State) => state.user) as User;
  const { clips } = user;

  const renderItem = ({ item }: { item: Article }) => (
    <ListItem
      imageUrl={item.urlToImage}
      title={item.title}
      author={item.author}
      onPress={() => navigation.navigate('Article', { article: item })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={clips}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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

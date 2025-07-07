import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ViewStyle,
} from 'react-native';
import ArrowRightIcon from '@assets/icons/chevron-right.svg';
import { Category, DropdownItem, SortBy } from '@custom-types/common';

// Default items for the dropdown
const DROPDOWN_ITEMS = [
  { label: 'Item 1', value: 'item1' },
  { label: 'Item 2', value: 'item2' },
  { label: 'Item 3', value: 'item3' },
];

type DropdownProps = {
  value?: string;
  items?: DropdownItem[];
  onSelect?: (item: DropdownItem) => void;
  placeholder?: string;
  style?: ViewStyle;
};

const Dropdown: React.FC<DropdownProps> = ({
  value = '',
  items = DROPDOWN_ITEMS,
  onSelect,
  placeholder = 'Select an item',
  style,
}) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (item: DropdownItem) => {
    setVisible(false);
    onSelect?.(item);
  };

  return (
    <View style={style}>
      <TouchableOpacity
        style={{
          ...styles.selector,
          borderBottomLeftRadius: visible ? 0 : 5,
          borderBottomRightRadius: visible ? 0 : 5,
        }}
        onPress={() => setVisible(v => !v)}
        activeOpacity={0.7}
      >
        <Text style={styles.selectorText}>{value ? value : placeholder}</Text>
        <ArrowRightIcon />
      </TouchableOpacity>
      {visible && (
        <View style={styles.dropdown}>
          <FlatList
            data={items}
            keyExtractor={item => item.value}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  ...styles.item,
                  backgroundColor: item.value !== value ? '#F8F8F8' : '#00B4E4',
                }}
                onPress={() => handleSelect(item)}
              >
                <Text
                  style={{
                    ...styles.itemText,
                    color: item.value !== value ? '#000000' : '#FFFFFF',
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // Android shadow
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  selectorText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  dropdown: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // Android shadow
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  itemText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#000',
  },
});

export default Dropdown;

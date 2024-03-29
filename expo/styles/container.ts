const flexVerticalCenter: object = {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
};

const flexVerticalTop: object = {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
};

const flexVerticalBottom: object = {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
};

const absolute = {
    position: 'absolute' as const,
    top: 0,
    zIndex: 1,
    color: '#fff',
};

export { absolute, flexVerticalCenter, flexVerticalTop, flexVerticalBottom };

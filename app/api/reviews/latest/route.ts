import {NextResponse} from 'next/server';

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 3000));

  return NextResponse.json({
    latest_reviews: [
      {
        board_id: 2,
        title: '게시물 하나 등록.',
        author_nickname: '리뷰어_7d055e77',
        category: 'cosmetic',
        preview:
          '글을 클릭하면 데스노트를 이용하여, 해당 의도를 담아 게시글을 작성합니다.\n\n안녕하세요! 이 게시물은 시스템 기능 테스트를 위해 작성된 글입니다. 본문 내용은 없으며, 잠시 후 삭제될 예정입니다. 양해 부탁드립니다. #테스트 #시스템점검',
        comments_count: 7,
        bookmarks: 2,
        image_url: 'https://d1izijuzr22yly.cloudfront.net/no-thumbnail.png',
      },
      {
        board_id: 3,
        title: '튜익도 진짜 후기!',
        author_nickname: '리뷰어_11e98e8f',
        category: 'clothes',
        preview:
          '사실 튜익도 자켓은 자가발전 탁탁한 부분으로 체형을 자연스럽게 잡아줘요. 고급스러운 원단 색감과 입는 순간 차오르는 자신감은 역시 명품의 힘! 오랜 입을 투자 가치 충분한 디자인이라 망설였던 후회 없이 만족합니다. 강력 추천템!',
        comments_count: 1,
        bookmarks: 1,
        image_url: 'https://d1izijuzr22yly.cloudfront.net/114e000b-1bff-4379-afd9-c3e6fede42cf.png',
      },
      {
        board_id: 4,
        title: '어제 잠이 안 와서 읽었던 신문기',
        author_nickname: '리뷰어_11e98e8f',
        category: 'book',
        preview:
          '경험에 대한 자극과 흥미가 자란다. 대학입시의 고통, 피던 잠 오던 제가 앉은 자리에 압독했어요. 마지막 챕터 반전에 경악! 독자 편견에서 비롯된 한계 타파. 필독으로 추천드립니다!',
        comments_count: 2,
        bookmarks: 2,
        image_url: 'https://d1izijuzr22yly.cloudfront.net/02c1df6e-31a3-453a-803d-d4cecf764dba.png',
      },
      {
        board_id: 5,
        title: '등록은 가능한가요??',
        author_nickname: '리뷰어_7d055e77',
        category: 'cosmetic',
        preview:
          '해당 글을 네이버 로그인 130자 내외로 요약하고 등록하는 것을 가능합니까?\n\n요약: 게시글 등록 여부를 문의하며, 글 수정 요청을 보낼 예정입니다. 확인을 부탁드립니다.',
        comments_count: 0,
        bookmarks: 0,
        image_url: 'https://d1izijuzr22yly.cloudfront.net/no-thumbnail.png',
      },
      {
        board_id: 6,
        title: '타로 사고싶어요',
        author_nickname: '리뷰어_11e98e8f',
        category: 'car',
        preview:
          '고객님의 후기를 기반으로 작성된 리뷰입니다. 단점, 장점, 유지비 등 실제 경험을 공유해주시면 구매 결정에 큰 도움이 됩니다. 댓글로 소중한 의견 부탁드립니다.',
        comments_count: 0,
        bookmarks: 0,
        image_url: 'https://d1izijuzr22yly.cloudfront.net/no-thumbnail.png',
      },
      {
        board_id: 7,
        title: '타로 사고싶어요',
        author_nickname: '리뷰어_11e98e8f',
        category: 'car',
        preview:
          '고객님의 후기를 기반으로 작성된 리뷰입니다. 단점, 장점, 유지비 등 실제 경험을 공유해주시면 구매 결정에 큰 도움이 됩니다. 댓글로 소중한 의견 부탁드립니다.',
        comments_count: 0,
        bookmarks: 0,
        image_url: 'https://d1izijuzr22yly.cloudfront.net/no-thumbnail.png',
      },
      {
        board_id: 8,
        title: '타로 사고싶어요',
        author_nickname: '리뷰어_11e98e8f',
        category: 'car',
        preview:
          '고객님의 후기를 기반으로 작성된 리뷰입니다. 단점, 장점, 유지비 등 실제 경험을 공유해주시면 구매 결정에 큰 도움이 됩니다. 댓글로 소중한 의견 부탁드립니다.',
        comments_count: 0,
        bookmarks: 0,
        image_url: 'https://d1izijuzr22yly.cloudfront.net/no-thumbnail.png',
      },
      {
        board_id: 9,
        title: '타로 사고싶어요',
        author_nickname: '리뷰어_11e98e8f',
        category: 'car',
        preview:
          '고객님의 후기를 기반으로 작성된 리뷰입니다. 단점, 장점, 유지비 등 실제 경험을 공유해주시면 구매 결정에 큰 도움이 됩니다. 댓글로 소중한 의견 부탁드립니다.',
        comments_count: 0,
        bookmarks: 0,
        image_url: 'https://d1izijuzr22yly.cloudfront.net/no-thumbnail.png',
      },
    ],
  });
}

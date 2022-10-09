"""added address table

Revision ID: 100ddd0b4cfc
Revises: 5a994656ff4b
Create Date: 2022-10-07 10:00:01.806493

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '100ddd0b4cfc'
down_revision = '5a994656ff4b'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('addresses', sa.Column('street1', sa.String(length=100), nullable=False))
    op.add_column('addresses', sa.Column('street2', sa.String(length=100), nullable=True))
    op.add_column('addresses', sa.Column('city', sa.String(length=100), nullable=False))
    op.add_column('addresses', sa.Column('state', sa.String(length=100), nullable=False))
    op.add_column('addresses', sa.Column('zip', sa.Integer(), nullable=False))
    op.add_column('users', sa.Column('address_id', sa.Integer(), nullable=False, foreign_key='addresses.id'))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'address_id')
    op.drop_column('addresses', 'zip')
    op.drop_column('addresses', 'state')
    op.drop_column('addresses', 'city')
    op.drop_column('addresses', 'street2')
    op.drop_column('addresses', 'street1')
    # ### end Alembic commands ###
